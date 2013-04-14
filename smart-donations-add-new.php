
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
wp_enqueue_script('smart-donations-settings',plugins_url('/smart-donations/js/smartDonationsSettings.js'),array('isolated-slider'));
wp_enqueue_script('smart-donations-generator',plugins_url('/smart-donations/js/donationGenerator.js'),array('isolated-slider'));
wp_enqueue_script('smart-donations-configuration',plugins_url('/smart-donations/js/donationConfiguration.js'),array('isolated-slider'));
wp_enqueue_script('smart-donations-raphael',plugins_url('/smart-donations/js/raphael-min.js'),array('isolated-slider'));

wp_enqueue_style('smart-donations-main-style',plugins_url('/smart-donations/css/mainStyle.css'));
wp_enqueue_style('smart-donations-Slider',plugins_url('/smart-donations/css/smartDonationsSlider/jquery-ui-1.10.2.custom.min.css'));

?>





    <script type="text/javascript">
        var smartDonations_arrow_closed="<?php echo plugins_url('/smart-donations/')?>images/arrow_right.png";
        var smartDonations_arrow_open="<?php echo plugins_url('/smart-donations/')?>images/arrow_down.png";

        var smartDonationsRootPath="<?php echo plugins_url("/smart-donations/")?>";

        jQuery(function()
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

            if(typeof smartDonationsSavedOptions!='undefined')
            {
                SmartDonations_donationTypeClicked(null,smartDonationsSavedOptions);
            }
        });
        function SmartDonationsSave()
        {
            event.preventDefault();
            var button=rnJQuery(this);
            button.focus();
            button.attr('disabled', 'disabled');
            button.text("Saving...");

            var donationsOptions=rnJQuery("#smart_donations_component_options").serialize();

            var data={
                action:"rednao_smart_donations_save",
                name:rnJQuery("#smartDonationsName").val(),
                returningURL:rnJQuery("#smartDonationsReturningUrl").val(),
                email:rnJQuery("#smartDonationsEmail").val(),
                donationId:rnJQuery("#smartDonationsDonationId").val(),
                donationType:rnJQuery("#smartDonationsType").val(),
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
                <span>Name</span>
                <input type="text" name="smartDonationsName" id="smartDonationsName"/>
                <span class="description"> *The name of the donation, this name is displayed in the donations list</span>
                <br/>
                <span>Email</span>
                <input type="text" name="business" id="smartDonationsEmail"/>
                <span class="description"> *Email Used for the donation</span>
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

        <div id="smartdonationsItemsContainer">
            <div id="smartDonationsItemsContainerHeader">
                <span>Select a Donation Type</span>
            </div>
            <div id="smartDonationsItemsContainerBody">
                <div id="smartDonationsSlideAnimation">
                    <div id="smartDonationsItemsList">
                        <div class="smartDonationsItem">
                            <input type="hidden"  value="classic"/>
                            <img src="<?php echo plugins_url('/smart-donations/')?>images/classic_donation.png" alt="" >
                        </div>

                        <div class="smartDonationsItem">
                            <input type="hidden"  value="textbox"/>
                            <img src="<?php echo plugins_url('/smart-donations/')?>images/text_box_donation.png" alt="">
                        </div>

                        <div class="smartDonationsItem">
                            <input type="hidden"  value="threeButtons"/>
                            <img src="<?php echo plugins_url('/smart-donations/')?>images/three_buttons_donation.png" alt="">
                        </div>

                        <div class="smartDonationsItem">
                            <input type="hidden"  value="slider"/>
                            <img src="<?php echo plugins_url('/smart-donations/')?>images/slider_donation.png" alt="">
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







