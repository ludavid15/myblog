---
title: "Introduction to Optics"
topic: "Engineering"
path: "intro-to-optics"
author: "David Lu"
date: "2025-12-15"
preview: "I just bought a new camera, so join me as I refresh my memory on the physics of optics. This will be a post on just the basics, with the long term goal of working up to laser comms."
---

After spending many weeks poring over camera reviews, I finally committed to buying one. Originally I had wanted to buy the new Pixel phone, but one reviewer's sentiment really hit home - "AI fatigue". In a world where so much of my attention lives digitally, I realized she was right. I didn't want a better phone, I wanted more from my real life. 

Which is why I decided to buy a physical camera instead. It felt like a good way to stay grounded in the real world. So in anticipation of flooding my limited cloud storage space with photographs, I've decided to revisit the physics of optics to understand all of this a bit better. This post walks through the core ideas, enough to *cast some light* on the situation, and maybe provide a little intuition. 


# Basics

<v-divider :thickness="5"></v-divider>

## Convex Lens

This type of lens is shaped so that all light rays that enter it parallel to its central axis cross one another at a single point on the opposite side of the lens. This is also known as a "converging lens" because it "converges" light to a single point behind it. 

To illustrate this is a qualitative way, let's take a magnifying glass, which is a single convex lens. Let's say we are looking at a tree 10 meters away. Light from the tree enters the glass and converges at the focal point. If you placed your eye directly at this spot, you would see the tree, but it would be (much) smaller and inverted. If you moved your eyes closer or further, the image slowly blurs as it is no longer in focus. This is also known as a "real" image, because the light rays from the source actually converge in physical space to form this image. 

Now let's take our magnifying glass and look at a lady bug that's close up. When light from the lady bug hits the lens, the rays spread out. 

<PostImage id="intro-to-optics/001-basic" caption="A Basic Convex Lens" />

Looking from the other side, your brain traces the emerging light back to a point behind the actual object. This makes the lady bug look bigger ($h_1$). The dashed lines are imaginary rays filled in by our eyes and brains. In reality, there is no light actually tracing out those lines. Thus, this is also known as a "virtual" image. 

So two results are possible when looking through a convex lens, but at what threshold do objects transition from one to another? Well it turns out there is actually a third domain we haven't discussed yet.

1. When objects are > 2f: we get a real, inverted, smaller image
2. When objects are < 2f but > f: we get a real, inverted, but *magnified* image
3. When objects are < f: we get a virtual, upright, magnified image

These differences arrive naturally out from the geometry and the thin lens equation. But a real life example of these differences is best demonstrated through the example of a telescope vs a microscope. 

## Telescopes and Microscopes

Both of these use a pair of converging lenses. However, on a telescope, we look at objects much greater than 2 focal lengths away, but on a microscope, we are typically looking at objects between 2f and f. These primary lenses both form a real, inverted image. This inverted image is smaller on a telescope, and bigger on a microscope. 

But this is not the last step, since there is one more lens, the eyepiece. The eyepiece is placed to magnify this projection (d < f). This magnified image is what you see with your eyes. 

#### Telescope (d > 2f)

Light that hits our primary lens is near parallel.

<PostImage id="intro-to-optics/002-telescope" caption="A Basic Telescope Setup" />

#### Microscope (f < d < 2f)

Light that hits our primary lens is strongly diverging. 

<PostImage id="intro-to-optics/004-microscope" caption="A Basic Microscope Setup" />

## Concave Lens

Naturally, the opposite is a concave lens, also known as a diverging lens, because it causes light rays to bend away from the center. If we stood on the other side of a diverging lens, we would see the objects to be closer and smaller than they actually are. Again, this is a virtual image because our brain is reconstructing the light rays that emerge.

<PostImage id="intro-to-optics/003-concave" caption="A Basic Concave Lens" />

If you are near sighted and wear glasses, this is the type of lens you have. Since distance objects look blurry to you, these lenses make those objects appear closer (but smaller) so that your eyes can focus on them more easily. 

## Mathematics

Now that we have the qualitative concepts out of the way, let's define some mathematics. First, power. The power of a lens is a measure of how sharply it "bends" the light.

$$P = \frac{1}{f}$$

The greater the power, the more it bends light, and the smaller the focal length. Once we know the focal length, we can relate the position of objects viewed through a lens using the thin lens equation.

$$\frac{1}{f} = \frac{1}{d_i}+ \frac{1}{d_o}$$

This equation has a couple of assumptions:

1. The thickness of the lens is small relative to the focal length.
2. Paraxial approximation, that is, we are limiting the math to rays very close to the central optical axis, and nearly horizontal.

And finally, if we know the two distances, the ratio those values gives us the magnification, which allows us to relate sizes as well.

# Cameras

<v-divider :thickness="5"></v-divider>

Do you remember learning about pinhole cameras? Or did you ever build one of those solar eclipse viewers out of a shoebox? They form images using geometry. Each point on the object sends out light in many directions, but a small pinhole allows only a narrow bundle of rays from each point to reach the screen, so the image is sharp. If the hole is widened, rays from nearby points overlap on the screen, causing the image to blur. 

<PostImage id="intro-to-optics/005-pinhole" caption="Pinhole Camera" />

But the problem is that this greatly limits the total amount of light that reaches our sensor. How can we widen the "aperture" to let in more light, but keep the image in focus? That's what a convex lens does. The lens bends incoming light so that those from each point on the object converge to a corresponding point on the image plane. This allows a wider aperture and a much brighter image while maintaining focus. 

This same explanation can be used to understand the "bokeh" effect - that aesthetic quality of how out of focus areas appear in the photo. When we focus on an object with a camera lens, what we're really doing is setting a distance (d) to be in focus. Objects nearer or further form blurred circles instead of sharp points. This is true all the time, but when we decrease the aperture, it's like our pinhole camera example - we increase the depth of field and more of the scene appears in focus. When we increase the aperture size, we decrease the depth of field and exaggerate the blurring effect.  

However, changing the aperture has a direct effect on the total amount of light we collect. That's why to maintain brightness, we can compensate by adjusting the exposure time (via shutter speed), or by increasing the ISO (sensitivity of the sensor). 

## Buying Lenses

When buying camera lenses, you probably encounter descriptions like 18-55mm, or 70-200mm. But what are these numbers exactly? Well, these are the focal lengths (or range of focal lengths for a zoom lens). A shorter focal length bends light more strongly, producing a wider field of view (which is good for landscapes). A longer focal length bends light less, narrowing the field of view (which is good for taking photos of distant objects, like birds or wildlife). 

Conveniently, a longer focal length also increases the magnification. We can solve for magnification as a function of focal length, and the object distance.

For really distant objects, (d >> f), this effectively becomes m = -f/d. So as we increase the focal length, we increase magnification. If we are taking really close up photos ( d approaches f ), the magnification increases significantly, which gives us things like macro photography. 

## Perspective Compression

One thing that can vary with different focal lengths is the perspective, but not because of the lens itself. We've already said that longer focal lengths magnify the subject. To make up for this, a photographer can stand further back to keep the subject the same size in the frame. From further away, the ratio between near and far objects becomes smaller. Thus objects appear closer together. In other words, distance flattens spatial relationships.

<PostImage id="intro-to-optics/006-perspective" caption="Perspective Compression. This image is AI generated." />

When the focal length is short, you move in closer to your subject. Now the distance ratio between subject and background increases, so the background looks further away. This is a by-product of geometry, not an optical effect of the lens itself. 

## Aberrations

So far we've been living in an ideal world, but of course in reality lenses are not perfect. Let's talk about two types of aberrations.

First, there's chromatic aberration. This occurs because the refractive index of lenses varies with wavelength. It's the same principal that causes light to split into a rainbow through a prism. On a photograph, this results in "fringes" of color along the edges of objects. Chromatic aberration tends to get worse with higher power lenses. 

The second is geometric aberration. Remember that one of the assumptions of the thin lens equation is called the "paraxial assumption", which assumes light arrives parallel and near the center. At the edges of the lens, this assumption can break down, leading to geometric aberration. 

## Compound Lenses

Real optical devices today use many lenses together to correct for geometric and chromatic aberrations. By stacking multiple together, we can balance these effects to:

  1. Sharpen focus across the field
  2. Reduce distortion and color fringing
  3. Support wider apertures and zoom or focus adjustments

One such example is the "achromatic doublet". This typically involves a convex lens at the front, made of a glass with low dispersion, and a concave lens in the back, made of a glass with high dispersion. Combined together, they bring two wavelengths of light into focus on the same plane, greatly reducing chromatic aberration. 

# References

<v-divider :thickness="5"></v-divider>

* Brooks, William. ["What Do MM Mean in Camera Lenses: A Quick Guide"](https://camerarecaps.com/what-do-mm-mean-in-camera-lenses/). May 2025.
* ["Journey through a Photographer's Lens"](https://shuby.de/blog/post/journey-photography/)
* Urone, Paul Peter, and Roger Hinrichs. “Lenses.” Physics, OpenStax, 26 Mar. 2020, [https://openstax.org/books/physics/pages/16-3-lenses](https://openstax.org/books/physics/pages/16-3-lenses)
* Massachusetts Institute of Technology. Lecture Slides: 2.71 Optics (Spring 2009). MIT OpenCourseWare, 2009, [https://ocw.mit.edu/courses/2-71-optics-spring-2009/pages/lecture-slides/](https://ocw.mit.edu/courses/2-71-optics-spring-2009/pages/lecture-slides/)