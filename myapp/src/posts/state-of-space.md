---
title: "State of Space"
topic: "Aerospace"
path: "state-of-space"
author: "David Lu"
date: "2025-08-31"
preview: "An overview of research and technical development in the space industry. This is part one of two, and covers tech that improves affordability, maintainability, and capability"
---

While catching up with a friend the other day, I was struck by how different our careers had become. That familiar, yet always unexpected, and sometimes nostalgic feeling of surprise that time did in fact pass and people did in fact grow. They had taken a more technical route, diving deep into a niche on the cutting edge of engineering and science, while I had gone broad, working on integration and product management. 

I've often heard the warning about middle-management, especially in engineering. The "danger" of becoming an engineering generalist who lacks the technical depth to truly add value to a project. And to an extent, I think this is true. The best systems engineers are not the generalists, but the specialists who are able to bring a system level approach to their work. 

But that's not to say I think management is an unimportant responsibility. Done well, this kind of high level perspective is used to identify weaknesses, make tradeoffs, and to understand exactly how much a new innovation will buy us. It’s hard to quantify or verify this type of value - it’s often invisible in the final balance sheet. More often, the success of good systems engineering is to make sure some things *don’t* happen - like mistakes avoided, or plans that actually go according to plan. As my friend puts it, “when done well, it’s what allows the end product to be greater than the sum of its parts”. 

In any case, I figured it was time to supplement my technical depth. So this is part one of my deep dive into what's cutting edge. I call this my “state of space” article. But before just jumping into any one technology, I wanted to apply a bit of systems thinking. I wanted to develop a framework for thinking about the technologies that academics, startups, and experts are trying to figure out. Rather than just compiling a flat list of buzzwords, how can we organize these efforts into something more meaningful?

The framework I landed on revolves around the “-ilities”. These are the high level system objectives - affordability, capability, sustainability, reliability and so on. From here, we can trace the different innovations being pursued in service of each. Most of engineering comes down to balancing among these. A true breakthrough, however, is one that improves an “-ility” without forcing a sacrifice in another.

  1. Affordability
  2. Maintainability
  3. Capability
  4. Reliability & Availability
  5. Sustainability
  6. Survivability & Resilience
  7. Flexibility
  8. Interoperability

In this part one, we'll cover some tech that is making space more affordable, more maintainable, and more capable. 

# Affordability & Maintainability

<v-divider :thickness="5"></v-divider>

This is the big one that people love to talk about. A number of companies are working to make space more affordable, but in different ways. I’ve grouped maintainability into this category as well, because easier maintenance is usually done in the pursuit of affordability.

## Cheaper Launch Vehicles

I will caveat that I haven't worked on rockets in a long time. Many of my old classmates are now doing some pretty cool stuff with rockets, and they would be much more qualified to talk about this topic. So I won't be doing a deep dive here as much, and instead just try to summarize some things. There is an article from NASA which cites the following technical solutions to cutting launch costs:

  1. Simplify Vehicle Configuration
  2. Increase Production and Launch Rates
  3. Use Industrial Design and Production Methods
  4. Optimize for Cost
  5. Reduce Parts Count
  6. Reduce Instrumentation
  7. Design for Production & Operation

Interestingly, the article does not list "reuse" itself as the primary driver of cost reduction (after all, the Space Shuttle was "re-use" but that definitely wasn't cheap). Rather, re-use is valuable because it enables other cost-saving factors, like a faster launch rate and smoother operation without sacrificing reliability. But most of all, the author credits cheaper rockets to a less bureaucratic, and more vertically integrated development environment. 

#### SpaceX
Falcon 9 delivers a kilogram of payload into low earth orbit for around $2000, give or take $1000. This is already much cheaper than the space shuttle, but still quite expensive. Starship promises an order of magnitude reduction in launch prices, down to $100 or even $10 per kilogram. 

#### Blue Origin
New Glenn is a heavy lift vehicle that should have comparable payload capacity to Falcon Heavy. The rocket also promises to be re-usable, and given the tech & talent SpaceX has already developed they will probably get there. But their workflow I’ve heard is closer to that of the legacy companies, so I don’t know if they will achieve SpaceX levels of affordability. Their target payload capacity is 45,000 kg to LEO.

#### Rocket labs
Their next generation Neutron Rocket should have a payload capacity of 13,000 kg to LEO (presumably with landing, and not the expendable number).

#### Relativity
Their primary innovation was originally based on the promise of 3D printing. I think the goal was to use this as a mechanism for better manufacturing. As of 2025, I’m not sure if this technology has panned out. In any case, their new rocket is the "Terran R" with a payload capacity of 23,500 kg to LEO (with landing).

#### Firefly
Now supported by Northrop Grumman, Firefly has promised a new rocket called "Eclipse" with a payload capacity of 16,300 kg to LEO.

#### Legacy Aerospace Companies
And then of course there’s also the Vulcan rocket being developed by ULA, and the SLS which is a big joint effort by NASA and the legacy companies - Boeing, Northrop, Lockheed. Although these are new launch vehicles, I wouldn’t say these are being designed with affordability in mind. 

## Space Mobility & Logistics

Another, perhaps more ambitious way to tackle the cost of spaceflight is to build a common service platform for all kinds of different missions. The idea is to build vehicles that serve as a central hub for all kinds of operational needs. Think "public transportation", but in space. Under this plan, payloads can hitch a ride to their final destination, or permanently rely on this centralized bus for their power and delta-V needs. This has the potential to reduce both the capital cost of satellite development (since satellites may require less delta-V/power capability), as well as the operating and access costs once in space. This technology is becoming more relevant as we see the rise of satellite constellations, where many smaller payloads may be deployed into the same orbit. 

One such player in this field is Impulse. Their Helios vehicle is like a rocket 3rd stage, which can be used to deliver payloads to GEO orbits and beyond. They also have a satellite bus called "MIRA", which also has a high delta-V capability, and it's intended to fill this role as a "mobility" vehicle. With Tom Mueller at the helm, they will probably be successful. 

Another satellite worth mentioning is the Blue Ring, being developed by Blue Origin. This satellite bus is advertised as a "high maneuverability" bus, capable of hosting and deploying several payloads. 

If you had asked me 10 years ago if I thought this was a profitable business, I would have said no. The legacy aerospace companies nearly all have standard satellite bus designs, but when contracted by the government to host single, large, bespoke payloads, there's so much rework and redesign that these are often not profitable without cost-plus contracts. But now, the industry is different. Constellations are becoming more popular, and the power dynamic is shifting. Companies and the government have a higher appetite for risk. We’ll see if these companies can really make satellites that are a true consumer product, and not resort to selling their engineering hours as an integrator service.

<v-alert
    border="start"
    border-color="secondary"
    elevation="2">
    Space mobility and life extension is also space sustainability (more in part 2). Not only do they help reduce cost, they also reduce waste (in fact, reducing waste is one the ways in which the cost is reduced).
</v-alert>

## Life-Extension

Another way to make spacecraft more affordable is to extend the lifetime of existing satellites by maintaining them in orbit. This could mean making repairs, but most often, it means giving them more Delta-V. This strategy primarily applies to big, expensive, one-off satellites, like most of what's orbiting in GEO. By adding a little more Delta-V, you potentially extend the life by another 5 to 10 years, saving you the upfront capital cost of building an entirely new satellite.

In regard to providing Delta-V, there's two approaches I've seen. The first is to refuel the original satellite. The second is to simply dock or attach a "booster" and then perform maneuvers from the new vehicle (like how Dragon sometimes performs orbit raising for the ISS). 

Here are some companies designing spacecraft to fill this niche:

1. Astroscale -  a Japanese company, also working on space sustainability. They've flown a couple missions 
2. Northrop Grumman - there’s a subdivision called the SpaceLogistics company that has demonstrated 2 Mission Extension Vehicle (MEV) missions that perform on-orbit satellite servicing. Their next project consists of a larger Mission Robotic Vehicle (MRV) and several smaller Mission Extension Pods (MEP) that separates the responsibilities of servicing/repair from delta-V.

In general, the challenges facing these kind of vehicles are:

1. Precision GNC for approaching and interacting with other space vehicles. 
2. Lack of universal interfaces in S/C design.


# Capability

<v-divider :thickness="5"></v-divider>

Raw capability refers to the fundamental performance of a system. Improving it usually means increasing output without making things more expensive. Or put another way, reducing the cost per unit of capability. For instance, more efficient rocket engines improve capability. Or more on-board computing power. Or more powerful sensors that can detect and transmit more data. This also improves affordability, but that's not the main point. Fundamentally the aim is simple: to do more and to do it better. 

## Lasers

As we travel further into space, we will need a new way to move information. Radio waves, which have been the backbone of space communications ever since we started exploring space, are showing their limits. The bandwidth is too constrained, and their signals spread too widely to keep pace with demand. To solve this problem, we have lasers.

Unlike radio waves, laser beams are tightly focused and much higher frequency. The result is that it can deliver far more data per unit of power. This focus reduces signal loss over millions of kilometers of space, and enables data rates orders of magnitude higher than previous systems (think Gigabits per second, rather than Kilobits). For spacecraft streaming high resolution video, scientific measurements, or supporting humans in space, this kind of capability is essential. 

Here is the potential upside of lasers, or optical communications:
  1. Much faster data rate
  2. More efficient use of onboard power

Of course, it's not without its share of challenges:
  1. Not good through weather
  2. Requires very precise pointing systems
  3. Not much existing infrastructure/spare parts

### Pointing Accuracy

Let's think about constellations that use lasers for cross-links. We'll use Starlink as the example. I don't have the exact numbers, so we'll take some ballpark estimates. Let's say there are 100 distinct orbital planes (i.e. same inclination, but each with a unique RAAN). Given that there are 7000 to 8000 active Starlink satellites, that gives 80 satellites in a track. These satellites orbit around the 525 km altitude mark, which means they trace an orbit that covers about 45,000 km.

  $$C = (6371 km + 535 km) * 2 \pi$$

Assuming satellites are spread out equally, this puts the average distance between satellites along the same track at 500km (we're really using ball-park numbers here). At 500km away, what kind of pointing accuracy do we need in order for a laser communication system to actually be on target? Let's say we are trying to be accurate to within 10 meters. Well for small angles:

  $$\theta = \frac{error}{distance}$$

Which gives us 10 meter / 500 km or about 20 microradians! That is a pretty precise pointing system, but definitely manageable with today's technology. 

However, this way of looking at things (i.e. hit a target 10 meters wide at 500km away), is an oversimplification of the real physics and engineering that goes into a laser comm system. First, we need to consider beam divergence. A laser is not a straight line of light - it spreads out over distance as well. Further away from the center, the power drops off. This divergence angle is a function of the laser's wavelength and the transmitting aperture diameter. From physics, we have the Rayleigh criterion which defines the diffraction limited angular resolution as:

  $$\theta = 1.22 * \frac{\lambda}{D}$$

Physically, this is the *minimum* possible divergence. We can use something like 10 to 20 microradians for a typical optical terminal (Wavelength = 1550 nm, D = 0.10 meters). Thus, in practice, a better way to think about pointing accuracy is:

  *Keep the pointing error to within a fraction of the beam divergence.* 

So if the beam spreads to 40 or 50 m at 500km, the system just needs to stay within a few microradians of accuracy to guarantee enough light hits the receiver.


## Electric Propulsion

Another exciting technology that's becoming more widely adopted is electric propulsion (specifically, Hall Thrusters and Gridded Ion Thrusters). Starlink satellites use electric propulsion for all their maneuvers, and NASA's recent Psyche mission is the first *interplanetary* mission to use Hall effect thrusters. The primary advantage of electric propulsion over traditional chemical thrusters remains their incredibly high efficiency, requiring much less propellant to be carried onboard. 

For an in-depth look at electric propulsion systems, you can check out my other post [here](/posts/electric-propulsion). Current research and development is incremental and is focused on a few challenges:

  1. Building systems that are either much lower power (10 W or less), or systems that are much higher power (100 kW or more).
  2. Exploring alternative fuels types besides Xenon. Alternatives could be cheaper, but perhaps more exciting, finding fuels that can be manufactured off-planet would enable new types of missions altogether. 
  3. Alternative materials and containment methods to reduce plasma erosion.


## Constellations

A number of factors are driving the rise of constellations - affordability from cheaper launch vehicles, a growing emphasis on resiliency, and economics of scale from high volume production - but as this is the capability section, I want to talk about the performance benefits of constellations. 

First, latency. Across the vastness of space, the difference in latency from GEO altitude vs LEO altitude is significant (600ms vs only 30ms). For communications, this makes a difference. 

Second, interferometry. This is not a new science, but we're only just beginning to see this kind of technique deployed in space. One of the more famous examples you might recognize is the Very Large Array (VLA) - a set of 28 radio telescopes arranged in a Y, built in New Mexico. By combining the data from each telescope, we create a much larger effective aperture. This same principle is being applied to constellations of satellites. When flown in formation, they can create a much larger effective telescope that any single lens that could be launched from a rocket. 


# Conclusion

<v-divider :thickness="5"></v-divider>

And that covers part 1 of my foray into the cutting edge of space tech. Although I meant this as a deep dive into individual technologies, it became more of an overview of the industry. Time permitting, I still want to explore some of these topics in greater detail. There are some especially interesting papers from the Government Accountability Office (GAO) and Aerospace Corp on the economics of space mobility/satellite servicing. Stay tuned for future posts!

# References

<v-divider :thickness="5"></v-divider>

* Jones, H. ['The Recent Large Reduction in Space Launch Cost'](https://ntrs.nasa.gov/api/citations/20200001093/downloads/20200001093.pdf). (2018). NASA Ames Research Center.
* [Starlink Technology](https://www.starlink.com/technology). SpaceX.
* [Space Logistics Service](https://www.northropgrumman.com/what-we-do/space/space-logistics-services). Northrop Grumman.
* [Impulse Space Company](https://www.impulsespace.com/).
* [Deep Space Optical Communications](https://www.nasa.gov/mission/deep-space-optical-communications-dsoc/). NASA.
* Younus, O. et al. ["Overview of Space-Based Laser Communication Missions and Payloads: Insights from the Autonomous Laser Inter-Satellite Gigabit Network (ALIGN)"](https://doi.org/10.3390/aerospace11110907). 2024. Aerospace.
* [Blue Ring](https://www.blueorigin.com/blue-ring)