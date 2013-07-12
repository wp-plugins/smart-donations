var smartDonationsEditCampaign;

rnJQuery(function()
{
    var smartDonationsCampaignDialog=rnJQuery('#smart-donations-add-new-campaign-panel').dialog({
        modal:true,
        autoOpen:false,
        create: function(event, ui){
            rnJQuery('.ui-dialog').wrap('<div class="smartDonationsSlider" />');
        },
        open: function(event, ui){
            rnJQuery('.ui-widget-overlay').wrap('<div class="smartDonationsSlider" />');
            rnJQuery(".smartDonationsConfigurationFields").val('');
        },

    });


    rnJQuery("#sDonationsAddNew").click(function(event)
    {
        event.preventDefault();
        OpenCreateDialog();
    });

    function OpenCreateDialog()
    {
        smartDonationsCampaignDialog.dialog('open');
        smartDonationsCampaignDialog.dialog("option","title","Create Campaign");

        rnJQuery("#campaignSaveButton").unbind("click").click(function()
        {
           rnJQuery(this).attr('disabled', 'disabled');
            var data={
                action:"rednao_smart_donations_add_campaign",
                name:rnJQuery("#smart_donations_campaign_name").val(),
                description:rnJQuery("#smart_donations_campaign_description").val(),
                goal:rnJQuery("#smart_donations_campaign_goal").val()
            };

            rnJQuery.post(ajaxurl,data,ajaxCompleted);
        });


    }

    function ajaxCompleted(result)
    {
        rnJQuery("#campaignSaveButton").removeAttr('disabled');
        if(result=="success")
        {
            alert('Campaign saved successfully');
            location.reload();
        }else
        {
            alert(result);
        }
    }


    function OpenEditDialog(campaign) {
        smartDonationsCampaignDialog.dialog('open');
        smartDonationsCampaignDialog.dialog("option","title","Edit Campaign");

        rnJQuery("#campaignSaveButton").unbind("click").click(function()
        {
            rnJQuery(this).attr('disabled', 'disabled');
            var data={
                action:"rednao_smart_donations_edit_campaign",
                campaign_id:campaign.campaign_id,
                name:rnJQuery("#smart_donations_campaign_name").val(),
                description:rnJQuery("#smart_donations_campaign_description").val(),
                goal:rnJQuery("#smart_donations_campaign_goal").val()
            };

            rnJQuery.post(ajaxurl,data,ajaxCompleted);
        });

        rnJQuery("#smart_donations_campaign_name").val(campaign.name),
        rnJQuery("#smart_donations_campaign_description").val(campaign.description),
        rnJQuery("#smart_donations_campaign_goal").val(campaign.goal);
    }


    function EditCampaign(id)
    {


        for(var i=0;i<smartDonationsCampaignArray.length;i++)
        {
            if(smartDonationsCampaignArray[i].campaign_id==id)
            {
                OpenEditDialog(smartDonationsCampaignArray[i]);
            }
        }
    }

    smartDonationsEditCampaign=EditCampaign;

});


