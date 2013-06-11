var Host =  document.domain;
	if(Host=='localhost')
		{
			var baseUrl = 'http://localhost/mobileApps/mobileApp/';
		}
	else
		{
			var baseUrl = 'http://pinkcityinfo.com/mobileApp/';
		}
function menuData(obj){
	var featureRelId = $(obj).attr('featureRelId');
	var featureId = $(obj).attr('featureId');
	var menuhtml = $(obj).html();
	var userSiteId = $('#userSiteId').val();
	var backGroundColor;
	var textColor;
	var url = baseUrl+'web/web/getMenuHtml/'+featureId+'/'+featureRelId+'/'+userSiteId;
		//alert(url);
				var data = '';
					doAjaxCall(url,data,false,function(html){
						console.log(html);
						$.each(html,function(i,item){
						$('title,.headerData h1').html(menuhtml);
						$('#main-content').html(item.mob_style_html);
						backGroundColor  = item.globalBackground;
						textColor		 = item.globalTextColor;
						$('#main-content').css({'background-color':'#'+backGroundColor,'color':'#'+textColor});
						});
					});
}

function getLicenceData(){
var stringData;
var index;
var id;
	$.get('licence.txt',function(data){
		var fileData = data.split('\n');
		$.each(fileData,function(i,item){
			 stringData =  item.split(':');
			$.each(stringData,function(j,str){
			if(str == 'userSiteId'){
			 index = j;
			 id = stringData[index+1]
			}
			})
			
		})
		//alert(id);
		$('#userSiteId').val(id);
		getMenuList();
	});
}
function getMenuList(){
		var userSite = $('#userSiteId').val();
		//alert(userSite);
		var url = baseUrl+'web/web/getTabs/'+userSite;
		var data = '';
		//alert(url);
			// ajax calling
			doAjaxCall(url,data,false,function(html){
					//console.log(html);
					var menu ='';
						// append the menu
					//$('#back_image').attr('src','http://pinkcityinfo.com/assets/uploads/icon/'+html[0].image_name);	
					$.each(html, function(i,item){
					
						
						//menu +='<li><img src="http://pinkcityinfo.com/mobileApp/assets/uploads/icons/'+item.image_name+'"><a href="javascript:" onclick="menuData(this);" featureRelId="'+item.featureRelId+'" featureId="'+item.featureId+'"  userSiteId="'+item.userSiteId+'">'+item.featureName+'</a></li>';
						menu += '<li class="ui-block-a"><a  href="javascript:" onclick="menuData(this);" featureRelId="'+item.featureRelId+'" featureId="'+item.featureId+'"  userSiteId="'+item.userSiteId+'"><div><img src="http://pinkcityinfo.com/mobileApp/assets/uploads/icons/'+item.image_name+'" width="30" align="absmiddle"/></div>'+item.featureName+'</a></li>';
					});
					$('.navigation-menu').append(menu);
					$('.navigation-menu').listview();
				
			});
		}
function getUrlVars()
			{
			var vars = [], hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
			{
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
			return vars;
			}
		

function doAjaxCall(url,data,showLoading,callback)
			{
			   if (showLoading){
				   $('.loadingDiv').show();
			   }
					 $.ajax({
					 url: url,
					 type: "POST",
					 data: data,
					 dataType: "json",
					 cache: false,
					 success: function(html){
					 callback(html);
					 if (showLoading){
					 $('.loadingDiv').hide();
						}
				   }
				});
			} 