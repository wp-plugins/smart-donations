jQuery(SmartDonationSettings);



function SmartDonationSettings()
{
    rnJQuery('#smartDonationsAdvancedDetail').hide();
    rnJQuery('#smartDonationsBasic').click(SmartDonations_tagClicked);
    rnJQuery('#smartDonationsAdvanced').click(SmartDonations_tagClicked);
    rnJQuery('.smartDonationsItem').click(function(){SmartDonations_donationTypeClicked(this)});
    rnJQuery('#smartDonationsBackFromConfiguration').click(SmartDonations_backFromConfiguration);

    var configurationOptions=rnJQuery("#smartDonationsItemsList");
    var configurationSettings=rnJQuery("#smartDonationsConfiguration");


    var top = configurationOptions.offset().top-configurationSettings.offset().top;
    var left = configurationOptions.offset().left-configurationSettings.offset().left;

    left+=configurationOptions.width()+2;

   /* top += (image.height() / 2) - (text.height() / 2)-1;
    left += (image.width() / 2) - (text.width() / 2);
*/
    configurationSettings.css("top", top);
    configurationSettings.css("left", left);



}

function SmartDonations_backFromConfiguration() {
    rnJQuery("#smartDonationsSlideAnimation").animate({"left":"0"},250/*,function(){rnJQuery("#smartDonationsSlideAnimation").hide();}*/);
}


function SmartDonations_donationTypeClicked(div,donationOptions) {

    rnJQuery('#smartDonationsPreviewContainer').css('margin-top','20px');
    if(donationOptions)
    {
        var donationTypeSelected= donationOptions.smartDonationsType;
    }else
    var donationTypeSelected= rnJQuery(div).find(':hidden').val();
    rnJQuery("#smartDonationsType").val(donationTypeSelected);

    if(donationTypeSelected=='classic')
        this.smartDonationsDonationType=new smartDonationClassicConfiguration('smartDonationsPreviewContainer');
    if(donationTypeSelected=='textbox')
    {
        this.smartDonationsDonationType=new smartDonationTextBoxConfiguration('smartDonationsPreviewContainer');
        rnJQuery('#smartDonationsPreviewContainer').css('margin-top','-10px');
    }
    if(donationTypeSelected=="threeButtons")
        this.smartDonationsDonationType=new smartDonationsThreeButtonsConfiguration('smartDonationsPreviewContainer');
    if(donationTypeSelected=="slider")
    {
        this.smartDonationsDonationType=new smartDonationsSliderConfiguration('smartDonationsPreviewContainer');
        rnJQuery('#smartDonationsPreviewContainer').css('margin-top','-10px');
    }

    this.smartDonationsDonationType.generator.business=rnJQuery('#smartDonationsEmail').val();
    this.smartDonationsDonationType.generator.returningUrl=rnJQuery('#smartDonationsReturningUrl').val();

    this.smartDonationsDonationType.fillConfiguration();
    this.smartDonationsDonationType.generator.GenerateDonationItem();

    rnJQuery("#smartDonationsSlideAnimation").animate({"left":"-703px"},250/*,function(){rnJQuery("#smartDonationsSlideAnimation").hide();}*/);
    if(donationOptions)
    {
        SmartDonationsFillConfiguration(donationOptions);
    }

    //rnJQuery("#smartDonationsSlideAnimation").animate({"left":"-703px"},250/*,function(){rnJQuery("#smartDonationsSlideAnimation").hide();}*/);

}

function SmartDonationsFillConfiguration(donationOptions)
{
    for(var donationVariable in donationOptions)
    {
        var element=rnJQuery('input[name="'+donationVariable+'"],select[name="'+donationVariable+'"]');

        if(element.is(':checkbox'))
        {
            if(donationOptions[donationVariable]=="on")
                element.attr("checked",'on');
            else
                element.attr("checked",'');
        }else
            element.val(donationOptions[donationVariable]);
        element.change();
    }
}

function SmartDonations_tagClicked() {
    var src=rnJQuery(this).find('img').attr("src");
    if(src==smartDonations_arrow_closed)
        SmartDonations_openTag(this);
    else
        SmartDonations_closeTag(this);

}

function SmartDonations_closeTag(tag) {
    rnJQuery(tag).find('img').attr("src",smartDonations_arrow_closed)


    var detailName=rnJQuery(tag).attr('id')+'Detail';
    rnJQuery('#'+detailName).slideUp(200);
}


function SmartDonations_openTag(tag) {
    rnJQuery(tag).find('img').attr("src",smartDonations_arrow_open)

    var detailName=rnJQuery(tag).attr('id')+'Detail';
    rnJQuery('#'+detailName).slideDown(200);

}



