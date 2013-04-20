

/************************************************************************** Classic Donation We Pay ***************************************************************************************************/


function smartDonationClassicConfiguration_wepay(containerName,provider)
{
    smartDonationClassicConfiguration.call(this,containerName,new smartDonationsClassicDonationGenerator_wepay(containerName,null));
}

smartDonationClassicConfiguration_wepay.prototype=Object.create(smartDonationClassicConfiguration.prototype);


smartDonationClassicConfiguration_wepay.prototype.GetDonationConfigurationGeneratedCode=function(){
    return  "<table> "+
        "<tr>    "+
        "<td>Button Text</td> "+
        "<td><input name='smartDonationsButtonText' class='smartDonationsSettingField' type='text' value='Donate $10' /> </td> "+
        "</tr>"+
        "<td>Amount</td> "+
        "<td><input name='smartDonationsAmount' class='smartDonationsSettingField smartDonationsNumericField' type='text' value='10' /> </td> "+
        "</tr>"+
        "</table>";

};


/************************************************************************** TextBox Donation We Pay ***************************************************************************************************/


function smartDonationTextBoxConfiguration_wepay(containerName,provider)
{
    smartDonationTextBoxConfiguration.call(this,containerName,new smartDonationsTextBoxDonationGenerator_wepay(containerName,null));
}

smartDonationTextBoxConfiguration_wepay.prototype=Object.create(smartDonationTextBoxConfiguration.prototype);


smartDonationTextBoxConfiguration_wepay.prototype.GetDonationConfigurationGeneratedCode=function(){
    return  "<table> "+
        "<tr>    "+
        "<td>Comment</td> "+
        "<td><input name='smartDonationsComment' class='smartDonationsSettingField smartDonationsCommentField' type='text' value='If you like this plugin, please donate' /> </td> "+
        "</tr>"+
        "<td>Recommended Donation</td> "+
        "<td><input name='smartDonationsRecommendedDonation' class='smartDonationsSettingField smartDonationsNumericField' type='text' value='15' /> </td> "+
        "</tr>"+
        "<tr>    "+
        "<tr>    "+
        "<td>Style</td> "+
        "<td><select name='smartDonationsStyle' class='smartDonationsSettingField' ><option value='1'>One Line</option> <option selected='sel' value='2'>Two Lines</option><option value='3' >Three Lines</option></select></td> "+
        "</tr>"+
        "</table>";

};



/************************************************************************************* Three Buttons We Pay   ***************************************************************************************************/


function smartDonationsThreeButtonsConfiguration_wepay(containerName,provider)
{

    smartDonationsThreeButtonsConfiguration.call(this,containerName,new smartDonationsThreeButtonsDonationGenerator_wepay(containerName,null));
}

smartDonationsThreeButtonsConfiguration_wepay.prototype=Object.create(smartDonationsThreeButtonsConfiguration.prototype);




/************************************************************************************* Slider WePay  ***************************************************************************************************/



function smartDonationsSliderConfiguration_wepay(containerName,provider)
{

    smartDonationsSliderConfiguration.call(this,containerName,new smartDonationsSliderDonationGenerator_wepay(containerName,null));
}

smartDonationsSliderConfiguration_wepay.prototype=Object.create(smartDonationsSliderConfiguration.prototype);


