---
title: "Kessler Syndrome"
topic: "Aerospace"
path: "kessler-syndrome"
author: "David Lu"
date: "2025-02-10"
preview: "Despite its sci-fi sounding name, Kessler Syndrome is a very real, though not fully understood phenomenon. Here's the basic scenario: a small piece of debris collides with a satellite in Earth orbit. The collision creates 100 new pieces of debris, and each of those creates a new collision risk. Before long, this quickly cascades out of control. In the end, there is so much debris in space that entire orbits becomes unusable."
---

Despite its sci-fi sounding name, Kessler Syndrome is a very real, though not fully understood phenomenon. Here's the basic scenario: a small piece of debris collides with a satellite in Earth orbit. The collision creates 100 new pieces of debris, and each of those creates a new collision risk. Before long, this cascades out of control. In the end, there is so much debris in space that entire orbits becomes unusable. 

But if you're picturing an impassable barrier of space junk, you'd be mistaken. In all likelihood, launch vehicles passing through would be just fine. The probability of collision is high only for satellites sitting at a particular altitude. Space is after all, quite big and empty. 

Scientists and engineers haven't agreed yet on the severity of Kessler Syndrome, nor even on whether it's already begun. There have already been a couple of collisions over the last 20/30 years. Over time, atmospheric drag would de-orbit most of the debris in lower orbits, but at higher altitudes, the rate is significantly slower - on the order of thousands of years. 

# Mathematical Setup

<v-divider></v-divider>

First, let's talk about the challenges of predicting, or modeling a Kessler Syndrome scenario. There are two main ways to go about this. The first is to use a deterministic propagation model. This individually tracks objects in space and propagates forward in time to count the number of potential collisions. Although this is accurate, it is also *very* computationally expensive. That also makes it hard to explore different futures or even quantify uncertainty. 

Alternatively, we could take a more statistical approach, where we model the overall population change via a series of sources and sinks. This then boils down to just a few differential equations that can be solved and manipulated pretty easily. The trade-off here is that this lacks any real physical modeling of objects in orbit - it's all just averaged out. In reality some orbits and altitudes are used more often than others and debris is not homogeneously distributed. 

But for now, let's take a look at the second approach. For this post, we're outlining the methods used by Liang et. al. in their conference paper.

## Launch Rate

The Launch Rate is the rate at which new satellites are added to the environment. Obviously there's no good way to predict the future, but we can just project some historical trends here. 

## Decay Rate

The rate of decay is the rate at which objects (either satellites or debris) are removed from orbit, either intentionally or naturally. Objects are grouped by their species and size, and the rate of decay is proportional to the population of that group (a typical first order linear differential equation). 

$$\omega_{D, \alpha, \ell_i^\alpha}(t) = r_{D,\alpha} \cdot N_{\alpha,\ell_i^\alpha}(t)$$

## Collision Rate

The collision rate is modeled as a first order *non-linear* differential equation. 

$$\Omega_C(t) = r_C \cdot N_{\text{tot}}(t)^2$$

Where $\Omega_C(t)$ is the collision rate at time *t*, $r_C$ is a collision rate coefficient, and $N_{\text{tot}}$ is the total number of objects in orbit. A quick look will tell you that $r_C$ is doing a lot of heavy lifting in this equation. We can make some educated guesses based on empirical data, but in truth this parameter is hard to know precisely. 

## Results of the Paper

In their monte-carlo analysis, Liang et. al. found that under continued high launch rates, Kessler Syndrome is all but guaranteed by around the year 2080. This would be from simple over-crowding of LEO alone. Anti-satellite weapons testing (or any other debris generating event) further exacerbates the problem, pushing the timeline up to as early as 2050. 

# Tracking

<v-divider></v-divider>

Let's move on now to mitigating collisions. And to start, let's begin with tracking. After all, you can't avoid an object unless you know it's there. Most US tracking today is done by the Space Surveillance Network (SSN), which is operated by the US Army, Navy, and Space Force. It uses a combination of radars, optical telescopes, and satellites to accomplish its objective, and each tracking technology has its own pros and cons. Meanwhile in Europe, the European Space Agency (ESA) also has their own solutions like the Optical Space Surveillance (OSS) system.

## Radar

Radar systems work by sending radio waves out into space and measuring the time it takes for those waves to reflect off an object. Radar is very effective for objects in LEO, but suffers as the distance is increased. However, since they do not depend on sunlight or clear skies, they can be used more reliably for continuous tracking. The US Space Force operates a system known as the Space Fence out in the Marshall Islands, capable of tracking 200,000 objects and making 1.5 million observations per day. 

Let's run through a few basic mathematical principals for radar.

### Distance to Target

The distance to the target is pretty straightforward, just the speed of light times the time of flight (divided by two because it's round trip).

$$R = \frac{c \cdot \Delta t}{2}$$

### Recieved Power

The power recieved back at the transmitter can give you information about the radar cross section (RCS) of the target.

$$P_r = \frac{P_t G_t G_r \lambda^2 \sigma}{(4\pi)^3 R^4 L}$$

And here are what those variables represent:

* $P_r$ = received power
* $P_t$ = transmitted power
* $G_t$, $G_r$ = gains of the transmitting and receiving antennas
* $\lambda$ = wavelength of the transmitted signal
* $\sigma$ = radar cross-section (RCS) of the target
* $R$ = range to the target
* $L$ = system losses

### Doppler Shift

If the target is moving, we can compute its radial velocity (i.e. component of velocity directly toward or away from the source) by measuring the doppler shift. If the target is approaching, the frequency increases. If it is leaving, the frequency decreases.

$$f_d = \frac{2v}{\lambda}$$

Where $\lambda$ is the wavelength of the radar signal and $f_d$ is the doppler frequency shift.

## Optical

Optical tracking uses telescopes to visually observe objects. This method is especially useful for things in higher orbits, compared to radio waves which suffer from attentuation and reduced resolution at long distances. However, optical systems are limited by weather, daylight, and need a clear line of sight. 

For a general overview of optics and tracking, you can check out my article on [machine vision](/posts/machine-vision). Specifically for objects in orbit though, there are a few methods. Generally, the strategy is to observe the satellite relative to the background stars. Since stars are fixed from Earth's perspective, the motion of any object in orbit should be apparent. For instance, in a long-exposure image, satellites would appear as streaks (if the telescope is tracking the stars) or as points (if the telescope is tracking the satellite). In either case, we can easily pick out the objects in orbit.

Unlike radars or laser systems however, optical systems cannot directly measure distance from a single image. To get around this, multiple observations are required. These other observations can come from a different telescope (in which case you could just triangulate to find the distance), or they can just come from the same telescope but over time (with the help of a state estimator/kalman filter).


## Laser Ranging

Laser ranging works on the same principal as radar - shine a laser at your target then measure the time it takes for the signal to return. However, laser systems are much more accurate and precise (you can get millimeter level precision). They can also be built to work at very long range. For instance, in addition to their Satellite Laser Ranging (SLR) program, NASA also runs a Lunar Laser Ranging (LLR) program. 

In order to reflect the laser signal, the target generally has to be equipped with a reflector, typically a corner cube retro-reflector. These are just 3 orthogonal surfaces that meet at a corner. By the nature of this construction, any incoming rays are reflected back in the same direction, just translated a bit. 


# Maintaining a Catalog

<v-divider></v-divider>

Tracking may provide real-time position, velocity, and trajectory data, but maintaining a catalog of objects requires going a step further - predicting their future trajectory. And prediction is not trivial, as any GNC engineer could tell you. Especially for objects in LEO, things like perturbations, harmonics, and atmospheric drag all slightly change a satellite's path over time. For the purpose of Space Situational Awareness, knowing *how* objects *will* move is fundamental. 

A current catalog of objects over 10cm in diameter is maintained by the US Space Command, and is actually available to the public through [space-track.org](https://www.space-track.org/).


## Two-Line Element 

Though there are many ways to describe the orbit of an object, a common standard is the "Two-Line Element" set. This data format consists of two lines of encoded text that capture specific information about an object's orbit at a point in time. Using this data and an orbital model, one could predict future positions and velocities. 

```yaml
NOAA 14                 
1 23455U 94089A   97320.90946019  .00000140  00000-0  10191-3 0  2621
2 23455  99.0090 272.6745 0008546 223.1686 136.8816 14.11711747148495
```

These lines contain information like:

1. Satellite catalog number
2. Epoch
3. First and Second Derivative
4. Drag
5. Inclination
6. Right Ascension of the Ascending Node
7. Eccentricity
8. Argument of Perigee
9. Mean Anomaly
10. Mean motion

There are also checksums included at the end of each line. You can find a full breakdown [here](https://celestrak.org/norad/documentation/tle-fmt.php). Although TLE will probably stay relevant for many years to come, we are quickly exceeding the original 5 digit cap on catalog numbers used in the TLE format. As of 2020, the Consultative Committee for Space Data Systems (CCSDS) has defined a new format called the Orbit Mean-Elements Message (OMM) which allows for up to 9 digit catalog numbers. 

For an in-depth look, you can read the actual [Orbit Data Message Guide](https://ccsds.org/index.php?gf-download=2025%2F01%2F%2F502x0b3e1.pdf&form-id=5&field-id=9&hash=bf2ecac3451e4f8507f1bf096b8b6a66c3d965cf1a9e722f77391d88e9b49ff0).

# Collision Avoidance

<v-divider></v-divider>

Once we can predict where objects are going to be, the next challenge is to make sure they don't crash into each other. Models allow us to forecast close approaches - moments when two objects come within a few kilometers of one another - also known as **conjunctions**. From an operations perspective, the process can be broken down into three steps:

1. First, *Conjunction Assessment* is used to identify close approaches. This is also sometimes called *screening*. 
2. Second, *CA Risk Analysis* (CARA) is used to asses the liklihood of a collision, and determine if a maneuver is warranted. 
3. Third, *Collision Avoidance* is the act itself of taking "evasive maneuvers" to mitigate the risk. 

Each task is also usually performed by a different entity. Identifying conjunctions is done by **USSSPACECOM** and the **Space Control Squadron**. The risk assessment itself is usually done by the organization to which an asset belongs. For example, NASA's Johnson Space Center performs risk assessment for all NASA HSF programs. Then the maneuver is performed by whatever specific owner or operator there is (e.g. the group that would normally handle stationkeeping burns).

All together, these make up a concept usually refered to as Space Situational Awareness, or SSA. The objective of SSA is to maintain safe and sustainable space operations through an understanding of the space environment.


## Non-Cooperative Tracking

Consider, how do we know the maneuver itself is not going to create a new collision risk? What if someone else is also planning a maneuver that's not in the database? This is known as non-cooperative tracking, which is what the SSN does. But not knowing what other satellites may be planning introduces additional uncertainty and risk. And at the moment, manuever knowledge is more luxury than law. Organizations generally publish this information voluntarily, as there is no system in place to make this mandatory. 


# Space Traffic Management

<v-divider></v-divider>

Right now, space traffic is governed mostly by a patchwork of national regulations, information agreements, and voluntary data-sharing. But as space gets more crowded (especially with mega-constellations in LEO and also as more countries begin flying satellites), we'll need a unified approach to manage all this traffic. 

Obviously there are a lot of challenges, not the least of which is the politics of getting belligerent nations to actually work together. As the US withdraws from international cooperation, it's unclear who, if anyone, will take the lead. But for this post we'll focus on some of the technical solutions and challenges that have been proposed.

## Global Database

Although all spacefaring countries have some kind of catalog system in place, there lacks a truly unified or interoperable international database. The point of having one in place would be to standardize data formats, API's, and orbit models so that it can be accessible to all. 

## Conjunction Assessment Pipelines

Once a global database exists, the next step would be to create automated conjunction assessment tools and pipelines. Especially as we enter the era of mega-constellations, we'll need systems in place that allow for a certain amount of autonomy or semi-autonomous notification and decision making that can scale. One important decision to make, for instance, is who should move. Usually this requires a time-consuming phone-call between human operators, or in the case of Starlink, SpaceX usually takes the responsibility to move (which they already perform mostly autonomously).

## Maneuver Notification

The goal of such a system would be to share planned maneuvers in advance and prevent any potential maneuver-on-maneuver accidents. 

## Traffic Coordination System for Space (TraCSS)

TraCSS is a system being developed by NOAA's Office of Space Commerce for space traffic management. Eventually, the aim is for this service to take over much of the DoD's original conjunction assesment capability (including Space-Track.org). They are scheduled to complete their first phase by early 2026, though in practice it'll likely be many years before a complete system is in place.


# References

<v-divider :thickness="5"></v-divider>

* NASA Spacecraft Conjunction Assessment and Collision Avoidance Best Practices Handbook
* 18th Space Control Squadron. "[Launch Conjunction Assessment Handbook](https://www.space-track.org/documents/LCA_Handbook.pdf)".
* McGarry, Jan. (June 2012)."[An Overview of Satellite Laser Ranging](https://space-geodesy.nasa.gov/docs/2012/OverviewSLR_mcgarry_120606.pdf)". 
* [Satellite Laser Ranging (SLR) Overview](https://cddis.nasa.gov/Techniques/SLR/SLR_Overview.html). NASA. CDDIS.
* Rutter, D. (March 2025). [NASA Starling and SpaceX Starlink Improve Space Traffic Coordination](https://www.nasa.gov/centers-and-facilities/ames/nasa-starling-and-spacex-starlink-improve-space-traffic-coordination/). 
* [Office of Space Commerce](https://www.space.commerce.gov/). 
* Liang, C., Fanto, P., & Signoracci, A. (2023). [On the increased risk of Kessler Syndrome by anti-satellite tests](https://amostech.com/TechnicalPapers/2023/Poster/Liang.pdf). Advanced Maui Optical and Space Surveillance Technologies Conference (AMOS).


<style>
pre.language-yaml {
  padding: 16px;
  border-radius: 8px;
}
.lang-display {  /* Hides the language label in code blocks */
  display: none !important;
}
</style>