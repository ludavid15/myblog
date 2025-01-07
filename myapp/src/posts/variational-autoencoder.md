---
title: "Variational AutoEncoder"
topic: "Machine Learning"
path: "variational-autoencoder"
author: "David Lu"
date: "2023-04-14"
---

This post takes a deeper look at variational auto encoders (VAE). Like regular auto encoders, a VAE maps a large dimension onto a small set of latent variables, from which we can reconstruct something very close to the original input. However, unlike regular auto encoders, a VAE uses a probability distribution in the latent space. 

# Auto Encoders

<v-divider></v-divider>

Before getting into what a VAE is, let's make a stop along the way to discuss some applications of auto encoders. At the most basic level, an AE compresses your input. But if we feed it different types of input, we can change the question being asked. For instance, what if we applied gaussian noise to the input before providing it to the AE, but still asked it to return a noiseless image? Such an auto encoder is trained to become a "de-noising" auto encoder. 

We could also feed it input where we've covered up different pixels. An auto encoder trained on this data set would learn how to generate new content to fill those missing regions. This is called nueral inpainting. 


## The "Variational" in VAE

This word comes from a family of techniques for estimating intractable integrals called Variational Bayesian Methods. One such intractable integral is known as the *posterior probability*. I recommend checking out this [post](/posts/bayes) on Bayes Theorem for more information. A lot of that math is going to be very important in understanding how a VAE is constructed. 

<v-card variant="tonal" class="mb-5">
    <v-card-text>
    An intractable integral is one that cannot feasibly be computed in a reasonable amount of time.
    </v-card-text>
</v-card>

# Variational vs Regular Auto Encoders

<v-divider></v-divider>

Let's think for a moment about what really sets these two apart. We've introduced a VAE as basically a regular auto encoder, but instead we use a probality/normal distribution instead of explicit variables in the latent space. This might seem like a small change, but it has big implications. 

With explicit variables, we are finding a single number, or set of numbers. But there's no requirement that the latent space around these values are smooth. We could be constructing a patchwork of steep mountains and deep valleys. In fact, this is very likely, since typically we just optimize for the reconstruction loss. 

But with a normal distribution, we're now searching for a more "regular" set of latent variables. We're not looking for a single value anymore, we're trying to fit a *whole distribution*. In other words, you can think of this as a *normalized* version of the regular auto encoder. If your latent space as a whole is more smooth, you can interpolate more confidently within that space and still produce reasonable outputs from the decoder. 

## Log Probabilities

One more math concept to introduce - a log probability is just the logarithm of a probability. The advantage of a log probability is that we can add instead of multiply. Recall that the probabilities of independent events multiply with one another. 

## KL Divergence

KL Divergence is a measure of the difference between two probability distributions. 

$$KL(p\| q) = -\sum_{}^{} p(x) log(q(x)) + \sum_{}^{}  p(x) log(p(x))$$

$$KL(p\| q) = \sum_{}^{}  p(x) log \frac{p(x)}{q(x)}$$

Based on the equations above, we can deduce two facts about the KL divergence. First, it is always greater than zero. Second, it is not symmetric, i.e. the KL divergence of *p* with respect to *q* is not the same as the KL divergence of *q* with respect to *p*.

## The Latent Probability Distribution

As we've mentioned, a variational auto encoder uses a probability distribution for the latent dimensions. This is implemented as a vector of means, and a vector of standard deviations. When we go to the decoder, we can sample a latent vector from these distributions. Thus this process is *not* deterministic (and hints at why VAE's are considered a type of generative network).

Mathematically, we'd like to maximize the probability that we re-produce input *x* given the distributions in the latent dimension. Let's define the latent representation as **z** and the distribution of **z** as **p(z)**. 

Our probabilistic decoder can be defined by **p(x\|z)** or the distribution/liklihood of **x** given **z**. The opposite of that, our probabilistic encoder can be defined by **p(z\|x)**, or the distribution/liklihood of our latent variables given the input. Using Bayes Theorem, we can relate all of these together as:

$$p(z|x) = \frac{p(x|z)p(z)}{p(x)}$$


## Loss Function

The loss function for a VAE network consists of two pieces. The first is the reconstruction loss. This is a measure of how accurately we reproduce the input. The second is called the KL divergence term or distance loss. This pushes the distribution towards a normal guassian distribution, of mean zero and standard deviation one. We can think of this second term as a regularization term. 


## Reparametrization Trick

In the middle of our VAE, we used a sampling step to get from our learned distribution to a vector of latent variables to be input to our decoder. Unfortunately, this is an operation we cannot take the gradient of, which gets in the way when we try to perform gradient descent. 

The solution is to parametrize this step into two steps, one that is differentiable, and another that is stochastic but fixed.  


# Disentangled VAE

<v-divider></v-divider>

One common problem of neural network is that they tend to function a bit like a black box. How they arrive at a particular answer is often a bit of a mystery. To this end, a new type of VAE which addresses this problem is called a disentangled VAE. The basic principle behind a disentangled VAE is that it adds one additional hyper parameter to the cost function, which pushes the dimensions within the latent space to be independent of one another. 

When dimensions are uncorrellated, it is easier to understand what aspect each dimension captures. To use a linear algebra analogy, this is like finding the principle directions or eigenvectors of your space. 


# Further Reading

<v-divider></v-divider>

If you've mastered all the content on this page, I recommend tackling diffusion models next. The underlying math is very similar. 
