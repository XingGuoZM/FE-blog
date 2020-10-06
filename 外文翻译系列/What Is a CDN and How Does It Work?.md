原文地址：[What Is a CDN and How Does It Work?](https://www.sitepoint.com/what-is-a-cdn-and-how-does-it-work/)

CDN – you keep seeing the acronym. Maybe in URLs, maybe on landing pages, but it never quite clicked – what are Content Delivery Networks, what do they do exactly?

We’ll explain in this overview article, and demonstrate on two popular ones in followup posts.

![Network](https://uploads.sitepoint.com/wp-content/uploads/2017/10/1509315406network-1989146_640.png)

## CDN Basics
A CDN is a network of computers that delivers content.

More specifically, it’s a bunch of servers geographically positioned between the origin server of some web content, and the user requesting it, all with the purpose of delivering the content faster by reducing latency. This is their primary purpose.

These geographically closer servers, also called PoPs or Points of Presence, also cache the cacheable content which removes a lot of the load from the origin server. There are different types of CDNs offering different kinds of services, and they can have differing [network topology](http://www.doc.ic.ac.uk/~mz4615/): scattered CDNs aim to have as many servers scattered around the world as possible. Akamai is one such CDN. Consolidated CDNs have fewer points, but bigger ones built for network performance, throughput, and DDoS resistance.

## Types of CDNs
We said that their primary purpose was to reduce latency and speed up rendering. But in the modern world of 2MB images and 500kb JavaScript libraries that take 3 minutes to boot up on websites, this latency matters little. But there are other purposes to CDNs, too, which evolved over time.

### Content-oriented CDNs
Initially, CDNs were just for static content (JS, CSS, HTML). You had to push content to them as you created/uploaded it (they didn’t know they needed to update their cache with your content, not even as someone requested it).

Then, they added [origin pulling](https://knowledgelayer.softlayer.com/faq/how-does-origin-pull-work), making things more automatic – this meant that a user requested the CDN’s URL, and then the CDN requested the origin website’s URL automatically, caching what ever it got back. Additionally, availability became an important factor. Many CDNs now cache a website’s “last alive” state so that if the origin goes down, the CDNed content is still accessible to users, creating the illusion of stability until things return to normal.

Additionally, modern CDNs often offer auto-optimization layers which will automagically resize images and save them for future use based on the image size requested. This means what if your site has a 2MB header image and someone requests it on a 300px wide screen, the CDN will make a copy that’s 30kb in size and 300px wide and serve that in the future to all mobile users, automatically making the site faster.

### Security-oriented CDNs
The final layer of practicality added to CDNs was DDoS and bot protection. CDNs like Incapsula specialize in this.

As the CDN is the outermost layer of a website’s infrastructure and the first recipient of traffic, it can detect DDoS attacks early and block them with special DDoS protection servers called scrubbers without them ever reaching the origin server and crashing it.

Additionally, by using knowledge crowdsourced from its many clients, a CDN can learn about suspicious IPs, spammers, botters, even types of crawlers and their behavior. For example, a scraper that works on site A will, once identified, stop working on site B as well if that site is protected by the same CDN, because the traffic filter will recognize a pattern it’s seen before.

![German Shepard Guarding](https://uploads.sitepoint.com/wp-content/uploads/2017/10/1509315571german-shepherd-166972_640.jpg)

What’s more, while CDNs do allow their customers to upload custom certificates, they also offer their own. This has two benefits:

1. When a big vulnerability in the certificates appears, the CDNs usually quickly respond because they have the most to lose (all their customers). Hence, a fix is usually in place before most people even know about the security hole.
2. Connections are faster because if many websites use the same CDN, then you’ve already established a valid connection and mutual trust with the CDN via its SSL certificate, and this process does not have to be repeated for every site that uses that CDN’s certificate. This doesn’t impact an individual website as much as it does the entire web.
## Biggest Players
Some of the biggest players in the CDN space are companies like Akamai, AWS Cloudfront, Cloudinary, Incapsula, MaxCDN, Fastly, and others.

Rather than compare them in full, we’ll list the categories in which each can be a champion:

### Scraping and DDoS Protection
While fine in every other way too, Incapsula is unbeatable in scraping and DDoS protection. With an extensive database of not only offending proxy IP addresses but also mouse and browsing patterns of bots and scrapers, Incapsula stops most automated attacks dead in their tracks.

### Speed and Global Reach
Akamai, the CDN that even Facebook uses, has a proven track record of global availability. Their scattered model of network topology and availability in even the poorer parts of the world (something other CDNs lack) make content served with Akamai smooth to load even in low-connectivity areas. A close second is AWS Cloudfront from Amazon.

Choose if: you’re aiming for global reach, from China to US, from Finland to Antarctica.

### Affordability
Amazon Cloudfront is the cheapest of the paid plans (we don’t count free plans as those often lack important features) and has the arguably largest reach after Akamai, which isn’t exactly cheap (a scattered topology is expensive to maintain).

Choose if: price is an issue.

### Hotlinking
Hotlinking is when someone selects “Copy image address” on an image hosted on your website, and includes it in their own directly, with the original URL intact. This is usually sloppy and lazy work on the side of content thieves, but can lead to big expenses if the copycat succeeds in sharing their site on large-impact social media website like Facebook or Reddit, and your server suffers for it. MaxCDN and KeyCDN both offer very good hotlinking protection.

Choose if: you’ve got a gallery, travel blog, or any other image-rich site which is at risk of hotlinking.

### Other
We encourage you to go out and investigate on your own. There are countless posts comparing the CDNs one to the other, and each plan of each CDN differs in offered options to the next one. It’s extremely difficult to cover them all, and the landscape constantly changes.

## Implementation Process
Implementing a CDN typically entails changing some DNS records in the control panel of the registrar (the company renting you your domain name). This results in all traffic hitting the CDN first, which in turn hits your website. Since it all happens behind the scenes (through IPs), the process is transparent to the user.

![Front end vs back end](https://uploads.sitepoint.com/wp-content/uploads/2017/10/1509315728a1443ce742af309856b66e2d1777bd9d-coding-programming.jpg)

Sometimes, sites will add a special subdomain to their main domain on which to host images, JavaScript, CSS, and other static content. If you open the Network tab of a browser’s dev console or just pay attention to the status bar of your browser while a site like Facebook is loading, you’ll notice a lot of URLs with cdn in them – that’s the site in question requesting only some of its content from CDNs.

Why not request all content through CDNs? Because static content is usually big – 2MB images, 500kb of JS, etc. This is worth serving quickly, because a) it doesn’t change often and can be cached for a long time and b) removes a big, big load from the main server of the app, which can be dynamic.

## Conclusion
In this article, you learned what a CDN was and how it works. You found out about the different types of CDNs and their potential scope of work, as well as the biggest players in the field.

In two followup articles we’ll introduce Cloudinary and Cloudflare, and in our major Performance-Month-Project we’ll actually implement one of them into our real world app so you can see it in action on a live example. Stay tuned!