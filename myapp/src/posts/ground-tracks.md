---
title: "Satellite Ground Tracks"
topic: "Aerospace"
path: "ground-tracks"
author: "David Lu"
date: "2023-04-11"
preview: "The ground track of a satellite is its orbit projected into the surface. I'd recommend checking out the post on astrodynamics first, which gives a basic overview of how orbits work."
---

The ground track of a satellite is its orbit projected into the surface. I'd recommend checking out the post on [astrodynamics](/posts/astrodynamics/) first, which gives a basic overview of how orbits work. 

# Mathematical Basics

<v-divider></v-divider>

To start, here are the three parameters which we can use to define an orbit in the Earth Centered Interial frame. These function like a set of rotation angles which relate the orbital/perifocal frame to the ECI frame. 

* Inclination
* Right Ascension of the Ascending Node
* Argument of Periapsis

And then within the perifocal frame, the position/radius along the orbit is defined as a function of the true anomaly as:

$$ r = \frac{h^2}{\mu}\frac{1}{1+ecos(\theta)} $$

Let's also think about the position in the perifocal frame as a vector. In polar coordinates, this is just $r$ and $\theta$, but what about in cartesian coordinates? Well, something like this:

$$r_{perifocal} = \begin{bmatrix} r cos(\theta) \\ r sin(\theta) \\ 0 \end{bmatrix} $$

At this point, we can write a couple of rotation matrices to get from the perifocal frame to the ECI frame. The order of rotations is going to be:

1. Rotate about Z by the argument of periapsis $(\omega)$.
2. Rotate about X by the inclination $(i)$.
3. Rotate about Z by the right ascenrion of the ascending node $(\Omega)$.

Mathematically, this is going to be written as:

$$ r_{ECI} = R(\omega) \cdot R(i) \cdot R(\Omega) \cdot r_{perifocal}$$

Finally, we'll want to convert from ECI to ECEF. This is going to be a rotation about the Z axis. The angle is going to vary depending on the time. 

$$ r_{ECEF} = R(GMST) \cdot r_{ECI} $$

If we represent this ECEF position vector in spherical coordinates, we can take the radial and azimuth angles which will give us our longitude and latitude. All said and done, we'll have an expression for the ground track of our satellite as a function of the orbital parameters, time, and true anomaly. Keep in mind that the specific ground track on a 2D map might look different, depending on the type of projection used. 


# A Qualitative Perspective

<v-divider></v-divider>

An exact mathematical expression is great, but it doesn't offer very much in the way of visual intuition. We'd like to know how different parameters affect the ground track's shape. To start, let's clarify that while ground tracks are periodic, they aren't sinusoids. Nonetheless, we can still think about them with features like a "period" and "amplitude". 

## Inclination

The inclination defines the maximum (and also minimum) latitude reached by the ground track. (Remember that the inclination is the same measured from both above and below the equator). You also can't launch into a lower inclination orbit than the latitude of your launch site, hence why equatorial launch sites are very popular. 

## Orbital Period

The orbital period defines the "wavelength/frequency" of your ground track. However, we need to keep in mind that the Earth is also rotating. This means that on sequential orbits, we do not return to the same place. 

> Example: Let's say we're in a 2 hour LEO orbit. After we complete 1 orbit, the Earth will have rotated by 360 * (1/12) = 30 degrees. This means on every orbit, we'll cross the equator at a longitude that's shifted 30 degrees. 

## Eccentricity

The ground track of a circular orbit is symmetric about the equator. But if your orbit is elliptical, the track is going to change between the northern and southern hemisphere. 

But how exactly does it change? Well we know that for an elliptical orbit, we travel slowly at apogee, and quickly at perigee. In ground track terms, this means we don't cover a lot of ground at apogee, but we *do* cover a lot of ground at Perigee. Thus the ground track is going to be more "compact" under apogee, and more "spread out" under Perigee. 

## Apparent Retrograde

There's a magical altitude at which the period of our orbit is exactly equal to the 24 hours. This is called a *Geostationary* orbit, because satellites at this position appear to be stationary relative to the surface of the Earth. 

But what if the satellite is even further out? In this case, it is moving slower than the rotation of the Earth, and from an observer on the ground it's actually going to look like it's moving backwards (i.e.g East to West). This is also called apparent retrograde, where the satellite is still technically in a prograde orbit, it just appears to be in retrograde from the ground. 

Now that you get the idea, I want to caveat that we don't *have* to be strictly higher than GEO altitudes for this to happen. We could be in a highly elliptical orbit, and around the apogee of that orbit, we could be orbiting slower than the rotation of the Earth. 