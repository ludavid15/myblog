---
title: "Tuning ML for Performance"
topic: "Machine Learning"
path: "machine-learning-tuning"
author: "David Lu"
date: "2022-09-20"
---


In practice, machine learning algorithsm can be tricky to setup and tune. This post discusses the different metrics you can use to evaluate your algorithm, and how to fine-tine your setup based on how those metrics perform. 

# Hyper Parameters

<v-divider></v-divider>

Your hyper parameters are governing parameters that shape your architecture. This includes things like your step size, regularization parameters, number of hidden units, and number of hidden layers (among other things!).

There's no telling what combination of parameters might be most effective, and in fact there are so many possibilities that a methodical search is often too expensive to perform. Rather, a random approach might get you to a better solution faster.


# Training, Dev, and Test Data Sizes

<v-divider></v-divider>

For very large datasets (hundreds of thousands or millions), it usually makes sense to put the majority of your data towards training, like a 96/2/2 split.

With smaller datasets, you need to make sure that your dev and tests sets are large enough to still cover a full distribution of cases, so a 70/20/10 split might be more appropriate. 

Then there's also the unique case of **one-shot learning**, where you might have only one or two examples for each label (like with face recognition). The key to this type of problem is to re-examine your architecture. Rather than training an algorithm to identify each face (like in a classification problem), you can train an algorithm to tell if two pictures show the same person. (Do you see how by reframing the question we increase the effective data set size?)


# High Bias

<v-divider></v-divider>

High bias means that we've underfit the data, and failed to capture some important, high-level trends in our data. Your bias is the difference between the training set error, and the bayes error. 

<v-alert
    border="start"
    border-color="secondary"
    elevation="2">
    Bayes error is the minimum possible error, and indicates some inherent ambiguity in the data. No algorithm or human can achieve an error below the "bayes" error.
</v-alert>

The solution to high bias is often to use a bigger network, or to change up your architecture entirely. 


# High Variance

<v-divider></v-divider>

High variance means that we've overfit the data, and are capturing too much noise. The best solution to a high variance result is to increase your data set, or to try regularization. A third, less recommended approach, is to try early stopping, where you stop training the network before you've actually minimized the cost. The principle here is that additional gains are actually achieved by fitting to the noise, so if we stop before this point, we can avoid overfitting. While effective, this can be problematic because it forces us to trade-off between bias and variance - a compromise that we (and not the data) are forcing on ourselves. 

<v-alert
    border="start"
    border-color="secondary"
    elevation="2">
    Variance is typically the difference between your training error, and dev error. 
</v-alert>

## Regularization

Regularization is a method for reducing overfitting, or high variance. The basic principle is that the sum of all weights are added into the cost function, thereby encouraging the algorithm to keep weights small. 

$$Cost(w,b) = \frac{1}{m} \displaystyle \sum_{i=1}^m L(\hat{y}, y) + \frac{\lambda}{2m} \|w\|_2^2$$ 

Another way to achieve regularization is using something called **dropout regulization**. While training, we randomly remove some nodes in the network. This way, we're effectively training many smaller networks instead. The result is a more evenly distributed set of weights.


# Precision and Recall

<v-divider></v-divider>

Precision and Recall are two common parameters used for classification and identification tasks. These are qualitative metrics you can use to measure the performance of your network. And remember that it's very difficult to make something better unless it's measurable! (Good life advice in general).

* Precision - how much of your calculated result was right?
* Recall - how much of all that was right did you calculate?

They can be combined into something known as an F1 score.

$$F = 2 \cdot \frac{P*R}{P+R}$$

In practice, it's nice to have a single numeric value for evaluation, because then you can optimize for it. The tricky bit is figuring out if this is the right metric. 


# Mini-Batch Gradient Descent

<v-divider></v-divider>

A mini-batch is a subset of your total training data. By calculating the cost and gradient on less data, we can perform this operation faster, and take a descent step before laboriously computing the total cost across all our data (which can be a lot!). 

Instead of randomly pulling data for each mini-batch, we usually just shuffle our training set, and then take chunks of data in order. This makes sure we use all our data at some point. Once all mini-batches have been used to make a descent step, that's called 1 **epoch**. 

Also for computer architecture reasons, we often size batches by squares of two (64, 128, 256, etc.). In fact, you usually don't need your batches to be much larger than 256 or sometimes 512.


# Transfer Learning

<v-divider></v-divider>

Transfer learning works best when you lack data for your specific task, but know what there is plenty of data for a different but similar task. For instance, let's say you are making a cat classifier, but lack cat images. However, you have plenty of animal and non-animal images. To use transfer learning, you would initalize and train a classifier first on the second task, and then fine tune those weights for your cat classifier. 