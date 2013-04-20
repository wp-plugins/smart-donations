

/***************************************************************************** classic_wepay ***************************************************************************************************/


function smartDonationsClassicDonationGenerator_wepay(containerName,options,provider){
    smartDonationsClassicDonationGenerator.call(this,containerName,options,new smartDonationsWePayProvider(false));

    if(options)
    {
        this.smartDonationsButtonText=options.smartDonationsButtonText;
        this.smartDonationsAmount=options.smartDonationsAmount;
    }else
    {
        this.smartDonationsButtonText="";
        this.smartDonationsAmount=0;
    }
}
smartDonationsClassicDonationGenerator_wepay.prototype=Object.create(smartDonationsClassicDonationGenerator.prototype);
smartDonationsClassicDonationGenerator_wepay.prototype.DonationGeneratedCode=function()
{

    this.donationProvider.ButtonText=this.smartDonationsButtonText;
    return '<div class="smartDonationsClassicWePay">'+this.GetStartOfDonationForm(this.smartDonationsAmount)+'</div>';
}


/***************************************************************************** text box_wepay ***************************************************************************************************/


function smartDonationsTextBoxDonationGenerator_wepay(containerName,options,provider){
    smartDonationsTextBoxDonationGenerator.call(this,containerName,options,new smartDonationsWePayProvider(false));
    this.smartDonationsButtonText="Donate";
}

smartDonationsTextBoxDonationGenerator_wepay.prototype=Object.create(smartDonationsTextBoxDonationGenerator.prototype);
smartDonationsTextBoxDonationGenerator_wepay.prototype.DonationGeneratedCode=function()
{
    this.donationProvider.ButtonText="Donate";
    if(this.smartDonationsStyle==1)
    {
        return '<table class="smartDonationsTextBoxDonationContainer smartDonationsOneLineWePay">\
                              <tr>\
                                  <td>'+
            this.GetCommentTag()+

            this.GetTextBoxTag()+

            this.GetStartOfDonationForm(this.smartDonationsRecommendedDonation)+
            '</td>\
        </tr> \
  </table>';

    }

    if(this.smartDonationsStyle==2)
    {
        return '<table class="smartDonationsTextBoxDonationContainer smartDonationsTwoLineWePay">\
                              <tr>\
                                  <td>'+
            this.GetCommentTag()+
            '</td>\
         </tr>\
               <td>'+
            this.GetTextBoxTag()+
            this.GetStartOfDonationForm(this.smartDonationsRecommendedDonation)+
            '</td>\
        </tr> \
  </table>';

    }

    if(this.smartDonationsStyle==3)
    {
        return '<table class="smartDonationsTextBoxDonationContainer smartDonationsThreeLineWePay">\
                              <tr>\
                                  <td>'+
            this.GetCommentTag()+
            '</td>\
         </tr>\
         <tr>\
             <td>'+
            this.GetTextBoxTag()+
            '</td>\
         </tr>\
         <tr>  \
             <td>'+
            this.GetStartOfDonationForm(this.smartDonationsRecommendedDonation)+
            '</td>\
        </tr> \
  </table>';

    }
}

smartDonationsTextBoxDonationGenerator_wepay.prototype.GenerationCompleted=function()
{
    var generator=this;
    rnJQuery(this.GetRootContainer().find(".smartDonationsDonationBox").keyup(function()
    {
        generator.donationProvider.ChangeDonationAmount(generator,rnJQuery(this).val());
    }));

}




/************************************************************************************* Three Buttons We Pay  ***************************************************************************************************/


function smartDonationsThreeButtonsDonationGenerator_wepay(containerName,options)
{
    smartDonationsThreeButtonsDonationGenerator.call(this,containerName,options,new smartDonationsWePayProvider(true));
}


smartDonationsThreeButtonsDonationGenerator_wepay.prototype=Object.create(smartDonationsThreeButtonsDonationGenerator.prototype);

smartDonationsThreeButtonsDonationGenerator_wepay.prototype.DonationGeneratedCode=function()
{
    return '<div class="smartDonationsThreeButtonsDiv1" ><div class="smartDonationsDonationGeneratedItem"  >'+this.GetStartOfDonationForm(this.smartdonationsDonationquantity1)+
        '<div class="smartdonationsThreeButtonStyle"> \
            <image class="smartDonationsThreeButtonImage1 smartDonationsThreeButton" src="" />\
            <span class="smartDonationsThreeButtonSpan1 smartDonationsThreeButtonSpan" >'+this.smartDonationButtonText1+'</span>\
             </div></div>'+
        '<div class="smartDonationsDonationGeneratedItem"  >'+this.GetStartOfDonationForm(this.smartdonationsDonationquantity2)+
        '<div class="smartdonationsThreeButtonStyle smartDonationsThreeButtonMiddleDiv" > \
            <image class="smartDonationsThreeButtonImage2 smartDonationsThreeButton" src=""/>\
            <span class="smartDonationsThreeButtonSpan2 smartDonationsThreeButtonSpan" >'+this.smartDonationButtonText2+'</span>\
             </div></div>'+
        '<div class="smartDonationsDonationGeneratedItem"  >'+this.GetStartOfDonationForm(this.smartdonationsDonationquantity3)+
        '<div class="smartdonationsThreeButtonStyle"> \
            <image class="smartDonationsThreeButtonImage3 smartDonationsThreeButton" src="" />\
            <span class="smartDonationsThreeButtonSpan3 smartDonationsThreeButtonSpan" >'+this.smartDonationButtonText3+'</span>\
             </div>'+this.GetEndOfDonationForm()+'</div></div>';


}


smartDonationsThreeButtonsDonationGenerator_wepay.prototype.CreateAndLayoutImage=function(image,span,imageName)
{
    var generator=this;
    generator.GetRootContainer().find(image).attr('src',smartDonationsRootPath+'/images/'+imageName).load(function(){generator.AdjustSize(image,span,generator)});
    generator.GetRootContainer().find(image+','+span).click(function(){

        var a=rnJQuery(image).parent().parent().find('a');
        WePay.$(a).click();



    });
}




/************************************************************************************* Slider Donations We Pay  ***************************************************************************************************/


function smartDonationsSliderDonationGenerator_wepay(containerName,options,provider){
    smartDonationsSliderDonationGenerator.call(this,containerName,options,new smartDonationsWePayProvider(false));

}
smartDonationsSliderDonationGenerator_wepay.prototype=Object.create(smartDonationsSliderDonationGenerator.prototype);

smartDonationsSliderDonationGenerator_wepay.prototype.DonationGeneratedCode=function()
{
    this.donationProvider.ButtonText="Donate";

    return  '<div class="smartDonationsDonationGeneratedItem"  >\
        <div  class="smartDonationsSlider smartDonationsSliderWePay" > '
        +                     this.GetDonationText()+
        ' <table class="smartDonationsSliderTable" >\
        <tr>                            \
            <td><span>Current Donation:</span><strong  class="smartDonationsAmount smartDonationsSliderDonationText">10</strong></td>             \
            <td rowspan="2"><div class="smartDonationsSmile smartDonationsSliderSmile"></div></td>                   \
        </tr>                                                                                                                               \
        <tr>      \
            <td><div class="smartDonationsSlide smartDonationsSliderDiv" ></div></td> \
            <td></td>                                         \
        </tr> \
        <tr>\
            <td>\
                '+this.GetStartOfDonationForm(this.smartDonationsDefaultValue)+'\
                        </td>\
                    </tr>\
                </table>  \
            </div></div>';




}

smartDonationsSliderDonationGenerator_wepay.prototype.ValueUpdated=function(generator,value)
{
    generator.donationProvider.ChangeDonationAmount(generator,value);
}