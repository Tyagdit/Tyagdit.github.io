var RuleCnt = 2;
var PhonyCnt = 0;
var IncludeAllFlag = true;

function AddRule()
{
	var DivIns =
				'<div class="card bm m-2" id="card'+String(RuleCnt)+'">\
					<div class="card-body" >\
						<div class="card-header row mb-2">\
							<h5 class="col fh">Rule '+String(RuleCnt)+'</h5>\
							<h6 class="mr-3 mb-3 fh" data-toggle="collapse" data-target="#cardform'+String(RuleCnt)+'" style="cursor: pointer;">—</h6>\
						</div>\
						<form id="cardform'+String(RuleCnt)+'" class="collapse show">\
							<div class="form-group row">\
								<label for="cmds" class="col-form-label col-sm-1 fh"><center>Perform</center></label>\
								<input type="text" id="cmds" class="form-control border-secondary col mr-4 bm" placeholder="commands">\
							</div>\
							<div class="form-group row">\
								<div class="input-group">\
									<label for="Targets" class="col-form-label col-sm-1 fh"><center>on</center></label>\
									<input type="text" id="target'+String(RuleCnt)+'" class="form-control border-secondary col mr-4 bm" placeholder="targets">\
									<label for="dpends" class="col-form-label col-sm-2 fh"><center>if there are changes in</center></label>\
									<input type="text" id="dpends" class="form-control border-secondary col mr-4 bm" placeholder="dependencies">\
								</div>\
							</div>\
							<button type="button" id="phonybtn'+String(RuleCnt)+'" class="btn btn-outline-secondary col-1 m-4" onclick="TogglePhony('+String(RuleCnt)+')" >PHONY</button>\
						</form>\
					</div>\
				</div>'
	$("#card"+String(RuleCnt-1)).after(DivIns);
	RuleCnt++;
	document.getElementById("Rulebtn").setAttribute("data-target","#card"+String(RuleCnt-1));
}

function ShowClean()
{
	document.getElementById("Cleanbtn").style.display = "none";
	document.getElementById("cleanrule").style.display = "block";
	
	if(!PhonyCnt)
	{
		document.getElementById("PhonyList").style.display = "block";
	}
	
	$('#PhonyBody').append('<h6 class="card-subtitle mb-2" id="PhonyItemClean"><a href="#cleanrule" class="fm">clean</a></h6>');
}

function TogglePhony(PhonyId)
{		
	if(!PhonyCnt)
	{
		document.getElementById("PhonyList").style.display = "block";
	}
	
	var btnid = '#phonybtn'+String(PhonyId);
	if($(btnid).hasClass('btn-outline-secondary'))
	{	
		$(btnid).removeClass('btn-outline-secondary');
		$(btnid).addClass('btn-secondary');
		PhonyCnt++;
		AddPhonyListItem(PhonyId);
	}
	else
	{
		$(btnid).removeClass('btn-secondary');
		$(btnid).addClass('btn-outline-secondary');
		RemovePhonyListItem(PhonyId);
		PhonyCnt--;
	}
//	console.log(PhonyCnt);
}

function ShowOverlay()
{
	document.getElementById("overlay").style.display = "block";
}
function HideOverlay()
{
	document.getElementById("overlay").style.display = "none";
}

function AddPhonyListItem(PhonyId)
{
	var ItemIns = '<h6 class="card-subtitle mb-2 fm" id="PhonyItem'+String(PhonyId)+'"><a href="#card'+String(PhonyId-1)+'" class="fm">'+document.getElementById("target"+String(PhonyId)).value+'</a></h6>';
	$('#PhonyBody').append(ItemIns);
}

function RemovePhonyListItem(PhonyId)
{
	$('#PhonyItem'+String(PhonyId)).remove();
}

function TogglePhonyClean()
{		
	if($('#phonybtnclean').hasClass('btn-outline-secondary'))
	{	
		$('#phonybtnclean').removeClass('btn-outline-secondary');
		$('#phonybtnclean').addClass('btn-secondary');
		PhonyCnt++;
		$('#PhonyBody').append('<h6 class="card-subtitle mb-2 fm" id="PhonyItemClean"><a href="#cleanrule" class="fm">clean</a></h6>');
	}
	else
	{
		$('#phonybtnclean').removeClass('btn-secondary');
		$('#phonybtnclean').addClass('btn-outline-secondary');
		$('#PhonyItemClean').remove();
		PhonyCnt--;
	}
//	console.log(PhonyCnt);
}

function IncludeAll()
{
	if(!PhonyCnt)
	{
		document.getElementById("PhonyList").style.display = "block";
	}
	
	if($('#Allbtn').hasClass('btn-outline-secondary'))
	{	
		$('#Allbtn').removeClass('btn-outline-secondary');
		$('#Allbtn').addClass('btn-secondary');
		IncludeAllFlag = true;
		PhonyCnt++;
		$('#PhonyBody').append('<h6 class="card-subtitle mb-2 fm" id="PhonyItemAll">All</h6>');
	}
	else
	{
		$('#Allbtn').removeClass('btn-secondary');
		$('#Allbtn').addClass('btn-outline-secondary');
		IncludeAllFlag = false;
		$('#PhonyItemAll').remove();
		PhonyCnt--;
	}
}














