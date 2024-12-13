---
title: "Convolutional Neural Networks"
topic: "Machine Learning"
path: "convolutional-neural-network"
author: "David Lu"
date: "2024-12-10"
---

Convolutional neural networks are a very intuitive (and fast) type of network for image processing problems. It uses a mathematical operation called a convolution, to analyze/generalize different sections of the input.

The basic principle of a CNN is that a smaller matrix (aka, kernel, feature detector, filter), is passed over (i.e. convolved ) with the raw data. This is repeated over and over, and eventually passed through a fully connected layer (like in regular neural networks).

The key to CNN’s is the kernel matrix. Different kernels can be trained to identify different “features” from the data, ranging from the very basic (e.g. an edge or a corner), to more advanced objects (e.g. an eye or a nose), and finally to the most high level (e.g. a face).

CNN’s are an effective tool for processing very large images that would take up too much memory using a standard deep neural net. This is accomplished by:

1. Parameter sharing - only a few filters of all the same parameters are used everywhere.
2. Low connectivity - not every pixel depends on every other pixel, only its neighbors.
