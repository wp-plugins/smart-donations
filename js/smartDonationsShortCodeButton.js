(function() {
    javascriptUrl='';
    tinymce.create('tinymce.plugins.rednao_smart_donations', {
        init : function(ed, url) {
            javascriptUrl=url.substring(0,url.length-3);
            // Register command for when button is clicked
            ed.addCommand('rednao_smart_donations_short_code_clicked', function(a,donationId) {
                tinymce.execCommand('mceInsertContent', false, '[sdonations]'+donationId+'[/sdonations]');
                jQuery("#smartdonationsShortCodeDialog").dialog('close');
                jQuery("#smartdonationsShortCodeDialog").remove();
            }),

            // Register buttons - trigger above command when clicked
            ed.addButton('rednao_smart_donations_button', {title : 'Smart Donations', image: javascriptUrl + '/images/short_code_button.png',
            onclick:function()
            {
                var data={
                    action:"rednao_smart_donations_list"
                };

                jQuery.post(ajaxurl,data,ajaxCompleted);

            }});
        }
    });


    tinymce.PluginManager.add('rednao_smart_donations_button', tinymce.plugins.rednao_smart_donations);
})();

function ajaxCompleted(result,status)
{
    var donationArray=jQuery.parseJSON(result);

    var smartDonationsPopUpForm='<div id="smartdonationsShortCodeDialog"  title="Basic modal dialog"><select id="smartDonationsDonationList">';
    for(var i=0;i<donationArray.length;i++)
    {
        smartDonationsPopUpForm+='<option value="'+donationArray[i].DonationId+'">'+donationArray[i].Name+'</option>';
    }
    smartDonationsPopUpForm+='</select></div>;'
    var dialog=jQuery(smartDonationsPopUpForm);
    dialog.dialog({
        modal:true,
        draggable:false,
        title:' ',
        resizable:false,
        buttons:[
            {text: "Apply", click: function() {tinymce.execCommand('rednao_smart_donations_short_code_clicked', false, jQuery('#smartDonationsDonationList').val())}},
            {text: "Cancel", click: function() {jQuery(this).dialog("close")}}
        ]
    });

}


