+++
title = "Vim Can't Edit Files"
date = "2021-11-18T20:34:47+05:30"
cmd = "cat vim-cant-edit-files.md"
+++

When one thinks of editing files in an editor, the way you expect it to work is, have the contents of the file being edited in memory, being shown in the editor and any changes made to that to be in memory before being saved directly to that file. One would be wrong in thinking that if they used any of the vim flavours

## Background

I came across this "feature" on a completely unrelated bug hunting adventure. While working on some docker containers I had a volume bind mounted inside one of the containers, a hot reloadable config file for the running service (Caddy to be specific). Since it was reloadable I expected changes to take effect when I made changes to the config even when the container was running, which was not the case. I thought it was a caddy issue so I cat'd the config from within the container before and after making some changes from outside the container (which should propagate since its a volume), turns out it wasn't changing. So naturally I thought it was a docker issue. Now this took very long to debug, eventually I came across [this github issue](https://github.com/moby/moby/issues/15793), specifically [this comment](https://github.com/moby/moby/issues/15793#issuecomment-488691757). I'd skimmed over this design decision in my time using vim but i never gave it much thought.

## Problem

When you open a file in vim you dont "open" the file, you open a copy of the file and edit that and when you save it you replace the original file with the new copy. This works for most cases except the ones where the file is addressed using not its name or location on the filesystem. Docker mounts files into containers using their [inodes](https://en.wikipedia.org/wiki/Inode) and when vim replaces files after "saving", the inode changes. This means that the file that was mounted into the container no longer exists and the changes you make to it wont show up inside. This also happens with crontab, this is actually mentioned in the vim help docs (`:h 'backupcopy'`).

## Solution

Now the solution to this isnt very straightforward since this is a pretty core functionality of vim. You have to set the `backupcopy` option to yes, this dictates how the copy of the original file is made and replaced as well as how backups of files is done. Setting this to 'yes' makes it so that vim makes a copy of the file but still overwrites the original. This has a few side effects; from the vim docs:

> - Takes extra time to copy the file.
> - When the file has special attributes, is a (hard/symbolic) link or has a resource fork, all this is preserved.
> - When the file is a link the backup will have the name of the link, not of the real file.

This means that editing very large files in vim wouldn't be reliable, but setting it to no has worse implications:

> When the file is a link the new file will not be a link.

By default vim (or at least neovim) has it set to `auto`  which switches between yes and no based on file attributes to deal with the shortcomings. But since container mounted files or crontab files dont have any way to tell that they need the attributes preserved, vim just uses the default.

Another option is to use vim's modeline feature. These are lines at the end or beginning of a file that set some vim options for that file. To do this make sure `modelines` is set and add this line to the end of the file you want:

```vim
 vim:set backupcopy=yes:
```

**The whitespace at the beginning is necessary**

Surround this with the appropriate comment string, with the beginning whitespace after the comment character. For instance:

```vim
/* vim:set backupcopy=yes: */
```

This is obviously not ideal since it goes in your file, but it's tradeoffs either way, weigh your options.

I expect this quirk will trip me up again somehow, but that's what i get for using Vim.

TL;DR: Vim replaces the file you're editing with a copy instead of editing in-place, so you have to `set backupcopy = yes` to allow in-place editing but you give up being able to edit super large files.
