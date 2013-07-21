(function() {
    javascriptUrl='';
    tinymce.create('tinymce.plugins.rednao_smart_donations', {
        init : function(ed, url) {
            javascriptUrl=url.substring(0,url.length-3);
            // Register command for when button is clicked
            ed.addCommand('rednao_smart_donations_short_code_clicked', function(a,donationId) {
                if(jQuery('#redNaoSelection').val()=='button')
                    tinymce.execCommand('mceInsertContent', false, '[sdonations]'+donationId+'[/sdonations]');
                else
                    tinymce.execCommand('mceInsertContent', false, '[sdprogress]'+donationId+'[/sdprogress]');
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
var smartDonationsShortCodeDialog;
function ajaxCompleted(result,status)
{

    if(smartDonationsShortCodeDialog==null)
    {
        var smartDonationsPopUpForm='<div><div style="display: block;margin-bottom: 10px;"><select id="redNaoSelection"><option value="button">Donation Button</option><option value="progress">Progress Indicator</option></select></div> <div id="smartdonationsShortCodeDialog"  title="Basic modal dialog"><select id="smartDonationsDonationList">';
        smartDonationsPopUpForm+='</select></div></div>'
        var dialog=jQuery(smartDonationsPopUpForm);

        smartDonationsShortCodeDialog=dialog.dialog({
        modal:true,
        draggable:false,
        title:' ',
        resizable:false,
        buttons:[
            {text: "Apply", click: function() {tinymce.execCommand('rednao_smart_donations_short_code_clicked', false, jQuery('#smartDonationsDonationList').val())}},
            {text: "Cancel", click: function() {jQuery(this).dialog("close")}}
        ]
        });
    }else{
        smartDonationsShortCodeDialog.dialog('open');
        jQuery('#redNaoSelection').val('button');
    }

    ajaxDonationsCompleted(result);

    function ajaxDonationsCompleted(result) {
        var donationArray=jQuery.parseJSON(result);
        var options="";
        for(var i=0;i<donationArray.length;i++)
        {
            options+=' <option value="'+donationArray[i].Id+'">'+donationArray[i].Name+'</option>';
        }

        jQuery('#smartDonationsDonationList').empty().append(options);
    }

    jQuery("#redNaoSelection").change(function(){
            if(jQuery("#redNaoSelection").val()=='button')
            {
                var data={
                    action:"rednao_smart_donations_list"
                };

            }else
            {
                var data={
                    action:"rednao_smart_progress_donations_list"
                };
            }

            jQuery.post(ajaxurl,data,ajaxDonationsCompleted);
        }
    );



}


