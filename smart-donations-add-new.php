
<?php
/**
 * Created by JetBrains PhpStorm.
 * User: edseventeen
 * Date: 3/29/13
 * Time: 9:29 AM
 * To change this template use File | Settings | File Templates.
 */

if(!defined('ABSPATH'))
    die('Forbidden');
wp_enqueue_script('jquery');
wp_enqueue_script('isolated-slider',plugins_url('/smart-donations/js/rednao-isolated-jq.js'));
wp_enqueue_script('smart-donations-configuration',plugins_url('/smart-donations/js/donationConfiguration.js'),array('isolated-slider'));
wp_enqueue_script('smart-donations-configuration-wepay',plugins_url('/smart-donations/js/donationConfiguration_wepay.js'),array('isolated-slider','smart-donations-configuration'));
wp_enqueue_script('smart-donations-donation-provider',plugins_url('/smart-donations/js/donationProvider.js'),array('isolated-slider'));
wp_enqueue_script('smart-donations-generator',plugins_url('/smart-donations/js/donationGenerator.js'),array('isolated-slider','smart-donations-donation-provider'));
wp_enqueue_script('smart-donations-generator-wepay',plugins_url('/smart-donations/js/donationGenerator_wepay.js'),array('smart-donations-generator'));
wp_enqueue_script('smart-donations-raphael',plugins_url('/smart-donations/js/raphael-min.js'),array('isolated-slider'));
wp_enqueue_script('smart-donations-settings',plugins_url('/smart-donations/js/smartDonationsSettings.js'),array('isolated-slider','smart-donations-configuration','smart-donations-configuration-wepay','smart-donations-generator','smart-donations-donation-provider'));


wp_enqueue_style('smart-donations-main-style',plugins_url('/smart-donations/css/mainStyle.css'));
wp_enqueue_style('smart-donations-Slider',plugins_url('/smart-donations/css/smartDonationsSlider/jquery-ui-1.10.2.custom.min.css'));

?>





    <script type="text/javascript">
        var smartDonations_arrow_closed="<?php echo plugins_url('/smart-donations/')?>images/arrow_right.png";
        var smartDonations_arrow_open="<?php echo plugins_url('/smart-donations/')?>images/arrow_down.png";

        var smartDonationsRootPath="<?php echo plugins_url("/smart-donations/")?>";

        function providerChanged() {
            SmartDonations_backFromConfiguration();
            var newProvider=rnJQuery(this).val()
            $("#smartDonationsProvider").val(newProvider);
            switch(newProvider)
            {
                case 'wepay':
                    rnJQuery('#smartDonationsImageClassic').attr('src','<?php echo plugins_url('/smart-donations/')?>images/classic_donation_wepay.png');
                    rnJQuery('#smartDonationsImageTextBox').attr('src','<?php echo plugins_url('/smart-donations/')?>images/text_box_donation_wepay.png');
                    rnJQuery('#smartDonationsImageSlider').attr('src','<?php echo plugins_url('/smart-donations/')?>images/slider_donation_wepay.png');
                    rnJQuery('#emailText').text("Donation Id");
                    rnJQuery('#imgEmailQuestion').show();
                    break;
                case 'paypal':
                    rnJQuery('#smartDonationsImageClassic').attr('src','<?php echo plugins_url('/smart-donations/')?>images/classic_donation.png');
                    rnJQuery('#smartDonationsImageTextBox').attr('src','<?php echo plugins_url('/smart-donations/')?>images/text_box_donation.png');
                    rnJQuery('#smartDonationsImageSlider').attr('src','<?php echo plugins_url('/smart-donations/')?>images/slider_donation.png');
                    rnJQuery('#emailText').text("Email");
                    rnJQuery('#imgEmailQuestion').hide();


            }


        }
        function SmartDonationsInitialize()
        {
            rnJQuery("#smartDonationsSaveButton").click(SmartDonationsSave);

           if(typeof smartDonationsSavedEmail!='undefined')
           {
               rnJQuery('#smartDonationsEmail').val(smartDonationsSavedEmail);
           }

           if(typeof smartDonationsSavedName!='undefined')
           {
               rnJQuery('#smartDonationsName').val(smartDonationsSavedName);
           }

            if(typeof smartDonationsSavedReturningUrl!='undefined')
            {
                rnJQuery('#smartDonationsReturningUrl').val(smartDonationsSavedReturningUrl);
            }

            if(typeof smartDonationsSavedId!='undefined')
            {
                rnJQuery('#smartDonationsDonationId').val(smartDonationsSavedId);
            }

            if(typeof smartDonationsDonationProvider!='undefined')
            {
                rnJQuery("#rednao_smart_donations_provider").val(smartDonationsDonationProvider);
            }

            if(typeof smartDonationsSavedOptions!='undefined')
            {
                SmartDonations_donationTypeClicked(null,smartDonationsSavedOptions);
            }

            rnJQuery("#rednao_smart_donations_provider").change(providerChanged);

            rnJQuery("#imgEmailQuestion").click(function()
            {
                var dialog= rnJQuery("#emailQuestionDialog").dialog({
                    width:720,
                    height:480,
                    modal:true,
                    draggable:false,
                    resizable:false,
                    create: function(event, ui){
                        $('.ui-dialog').wrap('<div class="smartDonationsSlider" />');
                    },
                    open: function(event, ui){
                        $('.ui-widget-overlay').wrap('<div class="smartDonationsSlider" />');
                    }
                });


            });

        };


        function SmartDonationsSave()
        {
            event.preventDefault();
            var button=rnJQuery(this);
            button.focus();
            button.attr('disabled', 'disabled');
            button.text("Saving...");
            var businessElement=rnJQuery('#smart_donations_component_options input[name="business"]');
            if(businessElement.length<=0)
            {
                rnJQuery('#smart_donations_component_options').append('<input type="hidden" name="business" value="'+rnJQuery("#smartDonationsEmail").val()+'"/>');

            }else
                businessElement.val(rnJQuery("#smartDonationsEmail").val());


            var donationProviderElement=rnJQuery('#smart_donations_component_options input[name="donation_provider"]');
            donationProviderElement.val(rnJQuery("#rednao_smart_donations_provider").val());

            var donationsOptions=rnJQuery("#smart_donations_component_options, #smart_donations_component_options form").serialize();

            var data={
                action:"rednao_smart_donations_save",
                name:rnJQuery("#smartDonationsName").val(),
                returningURL:rnJQuery("#smartDonationsReturningUrl").val(),
                email:rnJQuery("#smartDonationsEmail").val(),
                donationId:rnJQuery("#smartDonationsDonationId").val(),
                donationType:rnJQuery("#smartDonationsType").val(),
                donation_Provider:rnJQuery("#rednao_smart_donations_provider").val(),
                donationOptions:donationsOptions
            };

            rnJQuery.post(ajaxurl,data,ajaxCompleted);

        }

        function ajaxCompleted(result,status)
        {
            var obj=rnJQuery.parseJSON(result);
            alert(obj.Message);
            if(obj.DonationId!="0")
                rnJQuery("#smartDonationsDonationId").val(obj.DonationId)

            var button=rnJQuery("#smartDonationsSaveButton");
            button.removeAttr("disabled");
            button.text("Save");
        }

        function SmartDonationsSerializeObject(array)
        {
            var o={};

            rnJQuery.each(array, function() {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        }


    </script>












<form id='smart_donations_general_options'>
    <div id="rednaoSmartDonaitions">

        <input type="hidden" name="donationId" id="smartDonationsDonationId" value=""/>

        <div  >
          <div class="treeDiv" id="smartDonationsBasic" style="display: inline-block">
            <img class="treeButton" src="<?php echo plugins_url('/smart-donations/')?>images/arrow_down.png" alt=""/>
            <h2 class="treeTitle">Basic</h2>
          </div>
            <button style="margin-left: 530px;width:100px;cursor: hand;cursor: pointer;" id="smartDonationsSaveButton" >Save</button>
        </div>
        <div  id="smartDonationsBasicDetail">
            <hr/>
            <div class="category">
                <span>Donation Provider</span>
                <select name="smartDonationsProvider" id="rednao_smart_donations_provider" style="margin-bottom:5px;">
                    <option value="paypal" selected="sel">PayPal</option>
                    <option value="wepay">WePay</option>
                </select>
                <br/>
                <span>Name</span>
                <input type="text" name="smartDonationsName" id="smartDonationsName"/>
                <span class="description" style="margin-bottom:5px;"> *The name of the donation, this name is displayed in the donations list</span>
                <br/>
                <div>
                    <span id="emailText">Email</span>
                    <input type="text" name="business" id="smartDonationsEmail"/>
                    <img id="imgEmailQuestion" src="<?php echo plugins_url('/smart-donations/')?>images/questionMark_small.jpg" style="vertical-align: middle; cursor: hand; cursor: pointer; display: none;">

                    <span class="description"> *Email Used for the donation</span>
                </div>
            </div>
        </div>


        <br/>



        <div class="treeDiv" id="smartDonationsAdvanced">
            <img class="treeButton" src="<?php echo plugins_url('/smart-donations/')?>images/arrow_right.png" alt=""/>
            <h2 class="treeTitle">Advanced Options</h2>
        </div>
        <div  id="smartDonationsAdvancedDetail">
            <hr/>
            <div class="category" >
                <span>Returning Url</span>
                <input type="text" id="smartDonationsReturningUrl"/>
                <span class="description">*Page displayed after he does a donation</span>
            </div>
        </div>
</form>


<form id='smart_donations_component_options' action="https://www.paypal.com/cgi-bin/webscr" method="post" class="donationForm" target="_blank">


        <!--Item Container--->
        <input type="hidden" id="smartDonationsType" name="smartDonationsType"/>
        <input type="hidden" id="smartDonationsProvider" name="donation_provider"/>


        <div id="smartdonationsItemsContainer">
            <div id="smartDonationsItemsContainerHeader">
                <span>Select a Donation Type</span>
            </div>
            <div id="smartDonationsItemsContainerBody">
                <div id="smartDonationsSlideAnimation">
                    <div id="smartDonationsItemsList">
                        <div class="smartDonationsItem">
                            <input type="hidden"  value="classic"/>
                            <img id="smartDonationsImageClassic" src="<?php echo plugins_url('/smart-donations/')?>images/classic_donation.png" alt="" >
                        </div>

                        <div class="smartDonationsItem">
                            <input type="hidden"  value="textbox"/>
                            <img id="smartDonationsImageTextBox" src="<?php echo plugins_url('/smart-donations/')?>images/text_box_donation.png" alt="">
                        </div>

                        <div class="smartDonationsItem">
                            <input type="hidden"  value="threeButtons"/>
                            <img  src="<?php echo plugins_url('/smart-donations/')?>images/three_buttons_donation.png" alt="">
                        </div>

                        <div class="smartDonationsItem">
                            <input type="hidden"  value="slider"/>
                            <img  id="smartDonationsImageSlider" src="<?php echo plugins_url('/smart-donations/')?>images/slider_donation.png" alt="">
                        </div>
                    </div>




                    <div id="smartDonationsConfiguration">
                        <img id="smartDonationsBackFromConfiguration" src="<?php echo plugins_url('/smart-donations/')?>images/arrow_back.png" alt="">
                        <span id="smartDonationsItemTitle">Test</span>


                        <div id="smartDonationsCustomFields">

                        </div>


                        <div id="smartDonationsPreview" >
                            <span id="smartDonationsPreviewText">Preview</span>

                            <div id="smartDonationsPreviewContainer"></div>


                        </div>
                    </div>



                </div>


            </div>
        </div>

    </div>

</form>



    <div id="emailQuestionDialog" title="We Pay Id" style="display: none">
        <p>You can get the donation id on the code that you get when you create a donation button</p>
        <img src="<?php echo plugins_url('/smart-donations/')?>images/wepay_demo.png">
    </div>








