/**
 * Created with JetBrains WebStorm.
 * User: edseventeen
 * Date: 3/10/13
 * Time: 9:08 PM
 * To change this template use File | Settings | File Templates.
 */
function smartDonationConfigurationBase(title,containerName)
{

    this.title=title;
    this.containerName=containerName;

}

smartDonationConfigurationBase.prototype.fillConfiguration=function()
{
    rnJQuery('#smartDonationsItemTitle').text(this.title);
    rnJQuery('#smartDonationsCustomFields').html(this.GetDonationConfigurationGeneratedCode());

    var self=this;
    rnJQuery('.smartDonationsSettingField').click(function(){self.SettingChanged(self,this)});
    rnJQuery('.smartDonationsSettingField').keyup(function(){self.SettingChanged(self,this)});
    rnJQuery('.smartDonationsSettingField').change(function(){self.SettingChanged(self,this)});
    rnJQuery('#smartDonationsEmail').keyup(function(){self.SettingChanged(self,this)});

};

smartDonationConfigurationBase.prototype.SettingChanged=function(configuration,component){
    var changedFieldName=rnJQuery(component).first().attr("name");
    if(rnJQuery(component).is(':checkbox'))
        configuration.generator[changedFieldName]=rnJQuery(component).is(':checked');
    else
        configuration.generator[changedFieldName]=rnJQuery(component).val();
    configuration.generator.GenerateDonationItem();


};







/****Classic Generator***************************************/
function smartDonationClassicConfiguration(containerName)
{
    smartDonationConfigurationBase.call(this,'Classic');
    this.generator=new smartDonationsClassicDonationGenerator(containerName);
}
smartDonationClassicConfiguration.prototype=Object.create(smartDonationConfigurationBase.prototype);

smartDonationClassicConfiguration.prototype.GetDonationConfigurationGeneratedCode=function(){
    return  "<table> "+
        "<tr>    "+
        "<td>Display credit card logos</td> "+
        "<td><input name='smartDonationsdisplaycreditlogo' class='smartDonationsSettingField' type='checkbox' /> </td> "+
        "</tr>"+
        "</table>";

};



/*******Text Box Generator*****************************************/
function smartDonationTextBoxConfiguration(containerName)
{
    smartDonationConfigurationBase.call(this,'Text Box');
    this.generator=new smartDonationsTextBoxDonationGenerator(containerName);
}
smartDonationTextBoxConfiguration.prototype=Object.create(smartDonationConfigurationBase.prototype);

smartDonationTextBoxConfiguration.prototype.GetDonationConfigurationGeneratedCode=function(){
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




/*******Text Box Generator*****************************************/
function smartDonationsThreeButtonsConfiguration(containerName)
{
    smartDonationConfigurationBase.call(this,'Three Buttons');
    this.generator=new smartDonationsThreeButtonsDonationGenerator(containerName);
}
smartDonationsThreeButtonsConfiguration.prototype=Object.create(smartDonationConfigurationBase.prototype);

smartDonationsThreeButtonsConfiguration.prototype.GetDonationConfigurationGeneratedCode=function(){
    return  "" +
        "<table style='margin-left: -10px;' > "+
            "<tr>" +
               "<td><span>Make Same Size</span></td>"+
                "<td><input type='checkbox' name='smartDonationSameSize' class='smartDonationsSettingField' checked='true'/></td>" +
            "</tr>"+
            "<tr style='height:50px'>    "+
                "<td> <span><strong>Button 1</strong></span> </td>"+
                "<td>" +
                "       <table>" +
                "           <tr>" +
                "               <td style='text-align: left; margin-left:10px'>" +
                "                   <span>Style</span> <select name='smartDonationButtonStyle1' class='smartDonationsSettingField'><option value='threeButtonsStyle1.png' selected='sel'>Style 1</option><option value='threeButtonsStyle2.png'>Style 2</option></select> " +
                "               </td>" +
                "           </tr> " +
                "           <tr>" +
                "               <td style='text-align: left; margin-left:10px'>"+
                "                   <span >Text</span>  <input name='smartDonationButtonText1' class='smartDonationsSettingField smartDonationsCommentField' type='text' value='Thank you (&#36;5)' />  " +
                "               </td>" +
                "           </tr>" +
                "           <tr>" +
                "               <td style='text-align: left; margin-left:10px'>" +
                "                   <span>Donation Quantity</span> <input name='smartdonationsDonationquantity1' class='smartDonationsNumericField smartDonationsSettingField' type='text' value='5' />" +
                "               </td>" +
                "           </tr>" +
                "       </table> " +
                "</td> "+
            "</tr>" +
        "<tr style='height:15px'></tr>"+
        "<tr style='height:50px'>    "+
        "<td> <span><strong>Button 2</strong></span> </td>"+
        "<td>" +
        "       <table>" +
        "           <tr>" +
        "               <td style='text-align: left; margin-left:10px'>" +
        "                   <span>Style</span> <select name='smartDonationButtonStyle2' class='smartDonationsSettingField'><option value='threeButtonsStyle1.png' selected='sel'>Style 1</option><option value='threeButtonsStyle2.png'>Style 2</option></select> " +
        "               </td>" +
        "           </tr> " +
        "           <tr>" +
        "               <td style='text-align: left; margin-left:10px'>"+
        "                   <span >Text</span>  <input name='smartDonationButtonText2' class='smartDonationsSettingField smartDonationsCommentField' type='text' value='Wow, Thanks!(&#36;15)' />  " +
        "               </td>" +
        "           </tr>" +
        "           <tr>" +
        "               <td style='text-align: left; margin-left:10px'>" +
        "                   <span>Donation Quantity</span> <input name='smartdonationsDonationquantity2' class='smartDonationsNumericField smartDonationsSettingField' type='text' value='15' />" +
        "               </td>" +
        "           </tr>" +
        "       </table> " +
        "</td> "+
        "</tr>" +
        "<tr style='height:15px'></tr>"+
        "<tr style='height:50px'>    "+
        "<td> <span><strong>Button 3</strong></span> </td>"+
        "<td>" +
        "       <table>" +
        "           <tr>" +
        "               <td style='text-align: left; margin-left:10px'>" +
        "                   <span>Style</span> <select name='smartDonationButtonStyle3' class='smartDonationsSettingField'><option value='threeButtonsStyle1.png' selected='sel'>Style 1</option><option value='threeButtonsStyle2.png'>Style 2</option></select> " +
        "               </td>" +
        "           </tr> " +
        "           <tr>" +
        "               <td style='text-align: left; margin-left:10px'>"+
        "                   <span >Text</span>  <input name='smartDonationButtonText3' class='smartDonationsSettingField smartDonationsCommentField' type='text' value='You... Just Rock(&#36;25)' />  " +
        "               </td>" +
        "           </tr>" +
        "           <tr>" +
        "               <td style='text-align: left; margin-left:10px'>" +
        "                   <span>Donation Quantity</span> <input name='smartdonationsDonationquantity3' class='smartDonationsNumericField smartDonationsSettingField' type='text' value='25' />" +
        "               </td>" +
        "           </tr>" +
        "       </table> " +
        "</td> "+
        "</tr>"+
        "</table>";

};






/*******Slider Generator*****************************************/
function smartDonationsSliderConfiguration(containerName)
{
    smartDonationConfigurationBase.call(this,'Slider');
    this.generator=new smartDonationsSliderDonationGenerator(containerName);
}
smartDonationsSliderConfiguration.prototype=Object.create(smartDonationConfigurationBase.prototype);

smartDonationsSliderConfiguration.prototype.GetDonationConfigurationGeneratedCode=function(){
    return  "" +
        "<table style='margin-left: -10px;' > "+
        "<tr>" +
        "<td><span>Text</span></td>"+
        "<td><input type='text' name='smartDonationText' class='smartDonationsSettingField smartDonationsCommentField' value='If you like it, please donate.'/></td>" +
        "</tr>"+
        "<tr style='height:15px'></tr><tr>" +
        "<td><span>Minimun Value</span></td>"+
        "<td><input type='text' name='smartDonationsMinValue' class='smartDonationsSettingField smartDonationsNumericField' value='5'/></td>" +
        "</tr>"+
        "<tr>" +
        "<td><span>Maximun Value</span></td>"+
        "<td><input type='text' name='smartDonationsMaxValue' class='smartDonationsSettingField smartDonationsNumericField' value='50'/></td>" +
        "</tr>"+
        "<tr>" +
        "<td><span>Default Value</span></td>"+
        "<td><input type='text' name='smartDonationsDefaultValue' class='smartDonationsSettingField smartDonationsNumericField' value='25'/></td>" +
        "</tr><tr style='height:15px'></tr>"+
        "<td><span>Increments Of</span></td>"+
        "<td><input type='text' name='smartDonationIncrementOf' class='smartDonationsSettingField smartDonationsNumericField' value='1'/></td>" +
        "</tr>"+

        "</table>";

};