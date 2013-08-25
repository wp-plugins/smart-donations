=== Smart Donations ===
Contributors: EDGARROJAS
Donate link: https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=edseventeen%40gmail.com
Tags: donations, donate, donation buttons, donation widget,widget, paypal
Requires at least: 3.0.1
Tested up to: 3.5
Stable tag: 2.5.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Smart donations lets you pick different styles of donations that you can add to your posts (as a shortcode) or to any sidebar (as a widget). You can add paypal or wepay donations. 

== Description ==

Smart Donations
=

 Smart donations lets you pick different styles of donations and add them to your posts (as a shortcode) or to any sidebar (as a widget). Currently it supports paypal, wepay and four different styles of donations:
 
 *  **Classic Donation**.- The classic paypal or wepay button, When The user clicks the button he will be directed to the paypal/wepay page and he will define how much he want to donate there.
 
 *  **TextBox Donation**.- A paypal or wepay button with a text box so the donators can pick right away how much they want to donate.
   
 * **Three Buttons Donation**.- Three donation buttons (they dont have to be paypal buttons, you can customize them) each one with a different amounts (that you define) so the donators can donate with one click.
    
 *  **Slider Donation**.- This has an slider that the user can scroll to donate more or less money (you define the minimun and maximun amount), it also has a happy face that gets happier or not that happy depending on the donation amount.
 

PayPal also support IPN notifications so you can keep track of all the donations, you can show a goal meter or analize how well you have been doing in a period of time.

Also you can customize the paypal currency that you want to use for each donation button.

*You can find more here:[Smart Donations](http://rednao.com/smartdonations.html "Smart Donations")
== Installation ==

1. Upload smart donations to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Go to Smart Donations /Add new and create a new donation, you can use paypal or wepay.
4. To add the donation to a widget go to widgets and drag the smart donations widget
5. To add the donation to a post type [sdonations]donationid[/sdonations] (example:[sdonations]1[/sdonations]), you can find the donationid of your donation on the donations list (i will improve this on a future update)


== Frequently Asked Questions ==

= How can i get help=

You can check the smart donations video tutorial at http://rednao.com/tutorials.htm, if you have any question you can reach me at
https://www.facebook.com/SmartDonations

= How can i change the currencty of a wepay button =
Currently only paypal supports currencies, this is a wepay limitation so we dont have a way to add that to the plugin at this time.

= Why there is no ipn notifications for wepay =
This is another wepay limitation, Only paypal support ipn notifications because currently the standard wepay buttons does not support this.

= My progress indicators are not getting refreshed when i receive a donation =
The progress indicators need to use "IPN Notifications" so make sure to use paypal buttons, currently this plugin only support paypal IPN Notifications. (See question above for more information)






== Screenshots ==

1. Here you pick the donation style
2. Classic 
3. Text Box
4. Three Buttons
5. Slider
6. Example of site with donations
7. You can customize anything
8. Example of progress indicators (Pro feature)
9. Analytics (Pro)

== Changelog ==
= 2.1.1 =
* Fixed Warnings
= 2.0.1 =
* Fixed minnor issues
= 2.0 =
* Added progress indicators and analytics to paypal.
= 1.6 =
* Added supporting component and paypal/wepay styles.
= 1.5.5 =
* Added the ability to change the smile stroke and fill color. (thx for the suggestion Ralf)
= 1.5 =
* Added currency support for paypal, slider range of values and advance style option. (thx Philippe)
= 1.0.2 =
* Fixing minor bugs with the paypal buttons
= 1.0 =
* Adding an style editor and fixing IE bugs
= 0.5.1 =
* Fixing a bug with the slider (thanks Dave!)
= 0.5 =
* Initial release




== Upgrade Notice ==
N/A