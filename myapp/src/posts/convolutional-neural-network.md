---
title: "Convolutional Neural Networks"
topic: "Machine Learning"
path: "convolutional-neural-network"
author: "David Lu"
date: "2023-01-12"
---

Convolutional neural networks are a very intuitive (and fast) type of network for image processing problems. It uses a mathematical operation called a convolution, to analyze/generalize different sections of the input.

The basic principle of a CNN is that a smaller matrix (aka, kernel, feature detector, filter), is passed over (i.e. convolved ) with the raw data. This is repeated over and over, and eventually passed through a fully connected layer (like in regular neural networks).

The key to CNN’s is the kernel matrix. Different kernels can be trained to identify different “features” from the data, ranging from the very basic (e.g. an edge or a corner), to more advanced objects (e.g. an eye or a nose), and finally to the most high level (e.g. a face).

CNN’s are an effective tool for processing very large images that would take up too much memory using a standard deep neural net. This is accomplished by:

1. Parameter sharing - only a few filters of all the same parameters are used everywhere.
2. Low connectivity - not every pixel depends on every other pixel, only its neighbors.

# CNN is 3D

<v-divider></v-divider>

Although we think of images as 2D, there are actually three layers in a standard RBG layer, one for each color. This means that images are actually (h, w, d) matrices, and when we perform convolutions, our filters also need to be three-dimensional. Because of how convolutions work, doing so shrinks the height and width of our image. To avoid this, we can add "padding" to the original image. To refer to this we have two commonly used terms:

* Valid - no padding
* Same - enough padding to keep original dimensions.
 
The output image will have a number of channels equal to the number of filters we apply. So for instance, an input image that is (10, 10, 3), convolved with five filters that are (3, 3, 3), will produce an output of shape (8, 8, 5), assuming that we did not add any padding. 

## Pooling Layer

Pooling layers are "kernels" which use the function max or average. They are used to reduce the height and width of an input, but not the number of channels. This reduces the size of data. 

## Unit or Pointwise Convolutions

Consider what happens when you use a (1x1) kernel. The output doesn't get reduced in dimension, but the number of *channels* is changed depending on the number of kernels. This type of convolution is often used to reduce the number of channels, and you can think of it as a channel-wise version of a pooling layer.

## Transpose Convolution

Tranpose convolution is the opposite of regular convolution. Instead of shrinking the dimension of an input image, we increase the dimension by multiplying each input by a filter/kernel. This type of CNN is used when we start with something small, and want to increase its size.

Semantic segmention is one such application for this type of convolution. In segmentation segmention, we often start with a regular CNN to first shrink/identify the input, and then grow it out again to it's original dimension for pixel classification. In this particular case, semantic segmentation usually also involves the use of a skip connection. As we increase the image size, we re-incorporate earlier outputs from our CNN. 

## Residual Connections

In a deep convolutional neural network, a residual connection (or sometimes called a "skip connection") is a connection from an earlier layer, to a later layer. For instance, the input to layer 4 is usually the output from layer 3, but a residual connection means it might also receive the output from layer 1 or layer 2. In effect, residual connections allows us to train deeper networks! 

<v-alert
    border="start"
    border-color="secondary"
    elevation="2">
    Another way to think about these is that they work sort of like bypass diodes in a solar panel, which provide a path for the current to continue flowing, even if the cell becomes faulty. 
</v-alert>