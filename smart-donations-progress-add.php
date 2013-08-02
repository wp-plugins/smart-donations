
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

    global $wpdb;

    $campaigns=$wpdb->get_results("select campaign_id, name from ".SMART_DONATIONS_CAMPAIGN_TABLE);

wp_enqueue_script('jquery');
wp_enqueue_script('isolated-slider',plugin_dir_url(__FILE__).'js/rednao-isolated-jq.js');
wp_enqueue_script('smart-donations-progress-add',plugin_dir_url(__FILE__).'js/smart-donations-progress-add.js',array('isolated-slider'));
wp_enqueue_script('smart-donations-progress-config',plugin_dir_url(__FILE__).'js/smart-donations-progress-config.js',array('smart-donations-progress-add'));
wp_enqueue_script('smart-donations-progress-gen',plugin_dir_url(__FILE__).'js/smart-donations-progress-gen.js',array('smart-donations-progress-add'));
wp_enqueue_script('smart-donations-jscolor',plugin_dir_url(__FILE__).'js/jscolor.js',array('isolated-slider'));
wp_enqueue_script('smart-donations-raphael',plugin_dir_url(__FILE__).'js/raphael-min.js',array('isolated-slider'));
wp_enqueue_script('smart-donations-style-manager',plugin_dir_url(__FILE__).'js/smartDonationsStyleManager.js',array('isolated-slider'));



wp_enqueue_style('smart-donations-main-style',plugin_dir_url(__FILE__).'css/mainStyle.css');
wp_enqueue_style('smart-donations-Slider',plugin_dir_url(__FILE__).'css/smartDonationsSlider/jquery-ui-1.10.2.custom.min.css');


?>
<h1 style="display: inline-block">Add New Progress Indicator</h1>
<button style="margin-left: 288px;width:100px;cursor: hand;cursor: pointer;" id="smartDonationsSaveButton" >Save</button>
<hr/>




<form id='smart_donations_general_options'>
    <div id="rednaoSmartDonaitions">

        <input type="hidden" name="progress_id" id="smartDonationsProgressId" value=""/>
        <span>Name</span>
        <input type="text" name="progress_name" id="tb_progress_name"/>
        <span class="description" style="margin-bottom:5px;"> *The name of the progress indicator, this name is displayed in the progress list</span>

        <br/>
        <span>Campaign</span>
        <select name="campaign_id" id="select_campaign_id" style="margin-bottom:5px;">
            <option value="0">Default</option>
            <?php
                foreach($campaigns  as $campaign)
                {
                    echo "<option value='$campaign->campaign_id'>$campaign->name</option>";
                }
            ?>
        </select>


</form>


<form id='smart_donations_component_options' action="https://www.paypal.com/cgi-bin/webscr" method="post" class="donationForm" target="_blank">


    <!--Item Container--->
    <input type="hidden" id="smartDonationsProgressType" name="smartDonationsProgressType"/>
    <div id="smartdonationsItemsContainer">
        <div id="smartDonationsItemsContainerHeader">
            <span>Select a Progress Indicator Type</span>

        </div>
        <div id="smartDonationsItemsContainerBody">
            <div id="smartDonationsSlideAnimation">
                <div id="smartDonationsItemsList">
                    <div class="smartDonationsItem">
                        <input type="hidden"  value="progressBar"/>
                        <img id="smartDonationsImageClassic" src="<?php echo plugin_dir_url(__FILE__)?>images/ProgressBar.png" alt="" >
                    </div>

                    <div class="smartDonationsItem">
                        <input type="hidden"  value="panels"/>
                        <img id="smartDonationsImageTextBox" src="<?php echo plugin_dir_url(__FILE__)?>images/panels.png" alt="">
                    </div>



                </div>




                <div id="smartDonationsConfiguration">
                    <img id="smartDonationsBackFromConfiguration" src="<?php echo plugin_dir_url(__FILE__)?>images/arrow_back.png" alt="">
                    <span id="smartDonationsItemTitle">Test</span>


                    <div id="smartDonationsConfigurationFields" class="smartDonationsCustomFields">

                    </div>


                    <div id="smartDonationsPreview" >
                        <img id="smartDonationsEditImageButton" src="<?php echo plugin_dir_url(__FILE__)?>images/editButton.png" style="height: 25px; position: relative;display: inline;float:right;margin-top:5px; cursor: hand;cursor:pointer;">
                        <span id="smartDonationsPreviewText">Preview</span>

                        <div id="smartDonationsPreviewContainer">

                        </div>




                    </div>
                </div>



            </div>


        </div>
    </div>

    </div>

</form>

<?php  ?>

<div id="emailQuestionDialog" title="We Pay Id" style="display: none">
    <p>You can get the donation id on the code that you get when you create a donation button</p>
    <img src="<?php echo plugin_dir_url(__FILE__)?>images/wepay_demo.png">
</div>

<div id="smartDonationsEditWindow" title="Edit Time!! Click an element to edit it">

    <div id="smartDonationsEditionArea" class="smartDonationsCustomFields smartDonationsEditionArea">

    </div>

    <div id="smartDonationsEditionCSSArea" style="display:none" class="smartDonationsCustomFields smartDonationsEditionArea">
        <span>Here you can add CSS to customize the elemente like you want (example: width:10px;)</span>
        <textarea id="smartDonationsCSS" style="display: block; height: 250px;width: 680px;">

        </textarea>

        <button id="smartDonationsApplyStyle">Apply</button>
    </div>

    <div id="smartDonationRadio" class="smartDonationsSlider" style="text-align: right;width: 674px;">
        <input type="radio" id="radio1" value="basic"  name="smartDonationEditStyle"  checked="checked" /><label style="width:100px" for="radio1">Basic</label>
        <input type="radio" id="radio2"  value="advanced" name="smartDonationEditStyle" /><label label style="width:100px;margin-left:-5px;" for="radio2">Advanced</label>
    </div>


    <div id="smartDonationsPreviewEdition">
        <div id="smartDonationsPreviewEditionContainer" style="margin-top: 20px;"></div>

    </div>
</div>






