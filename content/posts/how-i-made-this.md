+++
title = "How I Made This Site"
date = "2020-09-06T01:52:40+05:30"
cmd = "cat how-i-made-this.md"
+++

I'm picky when it comes to stuff like this. I'd settled on Hugo since i had prior knowledge of how to use it, more so than jekyll. But the hard part was choosing a theme, in the end I decided to rice a theme I liked but wasn't fully sold on and made [my own](https://github.com/Tyagdit/hugo-theme-console).

The theme is still blog-focused but I overrode its homepage for this site.

Next I looked at how i would deploy it, Github Pages was an easy choice for a broke Indian student, but do I make a separate repo for the pre-build files and final site? How do i sync those? Do I have to manage multiple repos for this? There must be a way to automate this, thought a broke Indian programmer. I looked at Github Actions for Hugo but turns out theres an easier way.

In the repo settings I can choose which directory from the repo my site deploys from (sort of, there's just root/ and docs/). A couple tweaks to the config and that's that. One shell script to streamline this process later, voila, **you** get to cringe at this article!
