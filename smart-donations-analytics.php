<?php
/**
 * Created by JetBrains PhpStorm.
 * User: edseventeen
 * Date: 6/13/13
 * Time: 8:04 PM
 * To change this template use File | Settings | File Templates.
 */
wp_enqueue_script('isolated-slider',plugin_dir_url(__FILE__).'js/rednao-isolated-jq.js');
wp_enqueue_script('exCanvas',plugin_dir_url(__FILE__).'js/excanvas.min.js',array('isolated-slider'));
wp_enqueue_script('jqPlot',plugin_dir_url(__FILE__).'js/jquery.jqplot.min.js',array('exCanvas'));
wp_enqueue_script('jqHighlighter',plugin_dir_url(__FILE__).'js/jqplot.highlighter.js',array('jqPlot'));
wp_enqueue_script('jqCursor',plugin_dir_url(__FILE__).'js/jqplot.cursor.min.js',array('jqHighlighter'));
wp_enqueue_script('jqDateAxis',plugin_dir_url(__FILE__).'js/jqplot.dateAxisRenderer.min.js',array('jqHighlighter'));
wp_enqueue_script('jqCanvasAxis',plugin_dir_url(__FILE__).'js/jqplot.canvasAxisTickRenderer.min.js',array('jqCursor'));
wp_enqueue_script('jqPointLabels',plugin_dir_url(__FILE__).'js/jqplot.pointLabels.min.js',array('jqCanvasAxis'));
wp_enqueue_script('smart-donations-analytics',plugin_dir_url(__FILE__).'js/smart-donations-analytics.js',array('jqPointLabels'));


wp_enqueue_script('jqGridlocale',plugin_dir_url(__FILE__).'js/grid.locale-en.js',array('isolated-slider'));
wp_enqueue_script('jqGrid',plugin_dir_url(__FILE__).'js/jquery.jqGrid.min.js',array('jqGridlocale'));


wp_enqueue_style('jqgrid',plugin_dir_url(__FILE__).'css/ui.jqgrid.css');
wp_enqueue_style('jqplot',plugin_dir_url(__FILE__).'css/jquery.jqplot.css');
wp_enqueue_style('smart-donations-Slider',plugin_dir_url(__FILE__).'css/smartDonationsSlider/jquery-ui-1.10.2.custom.min.css');





if(!defined('ABSPATH'))
    die('Forbidden');

require_once('smart-donations-messages.php');
?>



<h1 >Analytics</h1>

<hr/>


<div id="smartDonationRadio" class="smartDonationsSlider" style="margin-bottom: 20px;">
    <strong >Start Date</strong>
    <input type="text" class="datePicker smartDonationsSlider" id="dpStartDate"/>
    <strong style="margin-left: 15px">End Date</strong>
    <input type="text" class="datePicker smartDonationsSlider" id="dpEndDate"/>
    <strong style="margin-left: 15px" >Campaign</strong>
    <select id="cbCampaign">
        <option value="-1" selected="selected">All</option>
        <option value="0" selected="selected">Default</option>
        <?php
        global $wpdb;
        $results=$wpdb->get_results("select campaign_id,name from ".SMART_DONATIONS_CAMPAIGN_TABLE);

        foreach($results as $result)
        {
            echo "<option value='$result->campaign_id' >$result->name</option>";
        }

        ?>
    </select>

    <script type="text/javascript" language="javascript">
        var RedNaoCampaignList="";
        <?php
            echo "RedNaoCampaignList='0:default";
            foreach($results as $result)
            {

                echo ";$result->campaign_id:$result->name";
            }
            echo "'";
        ?>
    </script>

    <strong style="margin-left: 15px" >Display Format</strong>
    <select id="cbDisplayType">
        <option value="d" >Daily</option>
        <option value="w" selected="selected">Weekly</option>
        <option value="m">Monthly</option>
        <option value="y">Yearly</option>
    </select>


    <Button style="margin-left:35px" id="btnExecute">
        Execute
    </Button>

</div>
<div style="width:80%;overflow-x: scroll;padding:25px;">
<div id="Chart"></div>
</div>


<div>
    <div class="smartDonationsSlider">
    <table id='grid' class="ui-jqdialogasdf" style="width:100%"></table><div id='pager'></div>
    </div>