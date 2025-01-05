---
title: "Intro to Machine Learning"
topic: "Machine Learning"
path: "intro-to-machine-learning"
author: "David Lu"
date: "2024-12-10"
---

There is so much literature out there on machine learning that it can get pretty overwhelming. This post introduces machine learning one concept at a time, without getting into any math. Before going further, it's worth mentioning that many machine learning algorithms are built using optimization. There is almost always something to be optimized (an objective function - error, fitness, etc.), and different ways to run the optimization (genetic, linear, quadratic, etc.). Different algorithms may change the problem, but the name of the game remains the same (for example, the "learning rate" and "search step size" usually refer to the same thing!) Keep this in mind, because it helps simplify our perspective. 

For any machine learning algorithm, we should be able to identify three distinct aspects:
1. **The architecture**, or relationship between inputs and ouputs, which influences the
2. **Cost function**, which we minimize by using different
3. **Optimization techniques**.

# Supervised Learning

<v-divider></v-divider>

When we know the type of output we want, but need to learn the function that will get us there, we use supervised learning. As the name implies, this method absolutely requires having a labeled dataset. If your problem doesn't readily accept labels, this strategy will probably fall short. Try instead to identify if *parts* of the solution involve identification. 

Supervised learning can be implemented with many architectures, and are usually associated with questions like:
1. What is this?
2. What comes next?

# Unsupervised Learning

<v-divider></v-divider>

In contrast to supervised learning, there is no "label" in supervised learning. This means that instead we are asking questions like:
1. How are these alike?
2. What are the correlations?

One outcome of many unsupervised learning algorithms is that we can compress or generalize our data set. If you've ever compressed an image or a word document, you've made use of an unsupervised learning technique. Some algorithms include:

* K-means Clustering
* Singular Value Decomposition
* Independent Component Analysis
* Autoencoders

A really cool outcome we get from unsupervised learning is the ability to generate new examples from the underlying patterns we discover, also known as generative modeling. 


# Representation Learning or Feature Learning

<v-divider></v-divider>

The goal of representation learning is to identify patterns in your data. This can be achieved both with supervised or unsupervised methods. 

Why? Because *patterns* are useful for questions like:
1. What is this? (Supervised learning)

And questions like:
1. How are these alike? (Unsupervised learning)

It turns out that in many machine learning algorithms, we create tools to identify and track patterns anyway. Hence, representation learning can be both supervised or unsupervised learning. Here's an example. We wish to write a program to classify flowers. Using a clustering approach, we might make measurements of the flower color or petal size and shape. K-means clustering would return the averages for each class. While we do find the averages, the properties were pre-defined. 

If we linearized the pixels of each image (n by m), we'd end up performing clustering in ($n \times m$) space, which is computationally expensive. 

So how can we get a machine to learn features? Well, when we perform supervised learning with something like a deep neural net, the last hidden layer before the output can actually be a set of features. Or in an unsupervised case, independent component analysis and autoencoders achieve this goal by looking for ways to represent the most original information in the fewest variables. The singular value decomposition and eigenvalues are two ways to do this. 

Consider the example of rotations. A rotation matrix in 3D is a 3x3 matrix, for a total of nine variables. But it turns out that any rotation in 3D can be represented by only three Euler angles (Roll Pitch Yaw). If we have those three numbers, we can follow a specific set of rules to reconstruct the original object. In this way, the Euler angles can be thought of as "features" of the rotation matrix. 


# Reinforcement Learning

<v-divider></v-divider>

Improvement through natural selection is the general idea of reinforcement learning. For some problems, success is measured by a distant goal, or by some cumulative performance. In these cases, it doesn't make sense to define individual state variables. Here is where reinforcement learning comes in. 

The example usually given is a video game. Intermediate objects or states don't result in a direct payoff - which means there isn't really a gradient over which to opimize. Instead, we can only reinforce behaviors that resulted in good results. 


# Knowledge Base or Symbolic AI

<v-divider></v-divider>

Although other algorithms perform well enough (i.e. the output is good), they don't gain any real "understanding" about what they're doing, at least, not in the same capacity as you or me. And when something does goes wrong, it's extremely difficult to identify the cause, especially when you're dealing with NN's that can have millions of weights. 

A knowledge base approach uses logic to make deductions. If I said that a cat is a type of mammal, and that all mammals are animals, then it could be deduced that a cat is a type of animal. These types of system are great for when we need to understand how the machine arrived at a decision. But because they operate on such an abstract level, building up the required database of statements is also a highly abstract task that relies on human input. Furthermore, many topics are not easily described with binary yes/no logic (things like the arts, personal opinions, relationships, etc.).






