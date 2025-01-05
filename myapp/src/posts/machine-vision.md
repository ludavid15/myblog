---
title: "Machine Vision and SLAM"
topic: "Computer Science"
path: "machine-vision"
author: "David Lu"
date: "2021-07-26"
---

Machine vision refers broadly to any imaging analysis task performed by a computer. Meanwhile, simultaneous localization and mapping (SLAM) is a specific domain focused on obtaining an understanding of the environment and your position within it. These two often go hand in hand (but not always!).

The topic of perception and machine vision can be broken down into a few separate problems. 

1. Odometry – where are you?*
2. Reconstruction/Mapping – where are things in the world?*
3. Semantics – what are things in the world?
4. Prediction – where will things in the world be?

**The coordinate frame is very important! Positions are always defined with respect to something.* 

<v-card class="mb-5">
    <v-table density="compact">
        <thead>
            <tr>
                <th>Task</th>
                <th>Implementation Strategy</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>Odometry</td>
                <td>Can be achieved with a number of things such as GPS, SLAM, internal IMU data, etc. </td></tr>
            <tr><td>Reconstruction</td>
                <td>Requires some sort of information about the environment. This can be achieved with cameras, LiDAR, radar, etc. There are also varying degrees to which we can process and store our internal model of the environment.</td></tr>
            <tr><td>Semantics</td>
                <td>Typically achieved through the use of machine learning, and some sort of image classification algorithm.</td></tr>
            <tr><td>Prediction</td>
                <td>Usually done with machine learning, or some kind of regression model.</td></tr>
        </tbody>
    </v-table>
</v-card>


# Image Projections

<v-divider></v-divider>

Consider a set of points in 3D space, defined by the camera frame. The projection of this point into the image plane can be expressed as:

$$u=f\frac{p_x^w}{p_z^w}$$

$$v=f\frac{p_y^w}{p_z^w}$$

Where $u$, $v$ are the coordinates of point P expressed in the image plane, and f is the focal length of the camera. Note that $u$, $v$ are not pixel coordinates, but image plane coordinates defined from an origin. 

An important characteristic of 2D images is the lack information regarding depth. A machine cannot tell if we are looking at a large object very far away or a close object nearby. There are really only two ways around this problem. First, you can take direct measurements of the depth, using something like LiDAR or radar. The other alternative is to collect a second snapshot from a different position, and then triangulate the depth according to how the view is shifted (like what we do with our eyes). However, note that the second method requires accurate knowledge of the two positions from which each snapshot is taken. 


# Feature Identification

<v-divider></v-divider>

Although modern vision systems may incorporate object identification and tracking, a more rudimentary system may begin by tracking local features. This begs the question, what defines a good feature? Long story short, corners are good features, while edges and surfaces are not. 

Consider a rectangular window centered around some pixel $\widetilde{x}$. This is a “good” feature if shifting the window in any direction produces a new window that is different from the original. Mathematically, let us define:

$$G=\sum_{W\left(x\right)}^{\ }{\nabla I\left(\widetilde{x}\right)\nabla I\left(\widetilde{x}\right)^\top}$$

Where $\nabla I\left(\widetilde{x}\right)$ is the gradient of the image. Two common ways of scoring the corner is with either the Harris score, or the Shi-Tomasi score. These are, respectively:

$$C\left(G\right)=det\left(G\right)-ktr\left(G\right)^2$$

$$S\left(G\right)=\lambda_{min}\left(G\right)$$

Where $\lambda_{min}$ is a function that returns the smallest eigenvalue of the matrix.


### Outliers

When we use a quadratic loss function, the weights of outliers are exaggerated. Thus instead of fitting the correct data, we end up fitting to the incorrect ones. This is not an easy problem to overcome, because we do not know ahead of time which data points are the wrong ones, but a few outlier robust methods do exist.


### Random Consensus Sampling (RANSAC)

From consecutive image frames, one can perform feature matching, and calculate the change in camera position between frames. However, given a set of matched features (typically called correspondences), there are bound to be a few mis-identified matches. RANSAC provides a method for dealing with these outliers. 

The basic idea is pretty simple. From the entire complete set of "matches", we take a random set, and calculate the resulting change in position. We then repeat with another random set, and another, and check to see if there is agreement.


# Image Segmentation

<v-divider></v-divider>

Broadly, image segmentation is pixel classification. The ultimate goal is to find meaningful groupings. Note that this can be done independently, in combination with, or as step in object classification, which involves finding labels. Traditional image segmentation methods are also not necessarily feature tracking methods or SLAM methods. Here are a few, ordered approximately by increasing complexity:

1. Hard-coded thresholds
2. Hard-coded kernels, like a sobel filter (which is basically an edge detector)
3. Watershed algorithms
4. Otsu-multi-level thresholding, a.k.a. K-means clustering
5. Convolutional neural networks (e.g. YOLO)


# Simultaneous Localization and Mapping

<v-divider></v-divider>

SLAM is a process which covers the first two goals in computer vision - odometry and mapping. SLAM then can be further subdivided into two components, a **front end** which identifies features in the environment, and a **back-end** which builds an internal map of those features.


# Misc Definitions

<v-divider></v-divider>

<v-card variant = "tonal" class="mb-5">
    <v-card-title>Isomorphism</v-card-title>
    <v-card-text>
    A form of transformation that preserves structure.
    </v-card-text>
</v-card>


<v-card variant = "tonal" class="mb-5">
    <v-card-title>Homography</v-card-title>
    <v-card-text>
    An isomorphism between projected images. 
    </v-card-text>
</v-card>