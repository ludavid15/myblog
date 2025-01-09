---
title: "Bayes Theorem"
topic: "Math"
path: "bayes"
author: "David Lu"
date: "2023-04-15"
---

Although there are many interpretations of Bayes Theorem, let's start with this one: Bayes Theory gives us a way to update a prediction based on observation of new evidence. 


# Part 1 - Introduction

<v-divider></v-divider>

Let's begin by introducing the equation upfront. The basic mathematical statement is that the probability of A given B, is equal to the probability of B given A, times the probability of A, divided by the probability of B. 

$$P(A|B) = \frac{P(B|A)P(A)}{P(B)}$$


<v-card variant="tonal">
    <v-card-title>The Prior Probability</v-card-title>
    <v-card-text>
    I think of this like the original estimate. This is what we are going to be updating, when we take into account new information about how B relates to A. 
    </v-card-text>
</v-card>

$$ P(A) $$


<v-card variant="tonal">
    <v-card-title>The Posterior Probability</v-card-title>
    <v-card-text>
    This is what we are solving for. In the absence of observed data, we would be solving for P(A). But if we have some observation B, now we can solve for a conditional probability, i.e. the probability of A given B.
    </v-card-text>
</v-card>

$$ P(A|B) $$

<v-card variant="tonal">
    <v-card-title>The Likelihood</v-card-title>
    <v-card-text>
    This term is called the likelihood because it is equal to the likelihood of A given a fixed B. 
    </v-card-text>
</v-card>

$$ P(B|A) $$

## Context and Frameworks

Let's back up a moment now and begin with some fundamentals. Bayes is actually one of three frameworks to approach statistics and probability. These frameworks are:

<v-card class="mb-5">
    <v-table>
        <thead>
            <tr>
                <th>Framework</th>
                <th>Explanation</th>
            </tr>
        </thead>
        <tbody>
            <tr :style="{ height: '65px' }"><td>Classical</td>
                <td>Outcomes that are equal likely have equal probabilities. This is what we are most accustomed to seeing, and use fractions to describe the probability of an event.</td>
            </tr>
            <tr :style="{ height: '65px' }"><td>Frequentist</td>
                <td>Or “relative frequency”. Requires us to have a hypothetical sequence of events, and we look at the frequency of events in that sequence. Tries to be objective in how we define probabilities.</td>
            </tr>
            <tr :style="{ height: '65px' }"><td>Bayesian</td>
                <td>A more subjective view of probability, which considers the fact that probabilities update and change with new data. It can also be thought of as “conditional probability” or probability with uncertainty.</td>
            </tr>
        </tbody>
    </v-table>
</v-card>


### Expected Values
Consider this game. You flip a fair coin. If the result is heads, you win $3. If the result is tails, you lose $4. What is the expected return?

$$3*(0.5) + (-4)*(0.5) = -0.5$$

You may think that on average you are losing $1, but you have to consider that the probability of flipping heads and tails are equally likely. Notice that the average result does not have to be an achievable outcome. 

## Conditional Probabilities

The probability of A given B, is the probability of A and B, divided by the probability of B. 

$$P(A|B) = \frac{P(A \cap B)}{P(B)}$$

We've been talking alot about conditional probability, but let's also introduce the concept of independence. 

<v-card variant="tonal" class="mb-5">
    <v-card-title>Independence</v-card-title>
    <v-card-text>
    When two events are independent of one another, the likelihood of both occurring is equal to the product of their independent probabilities.  
    </v-card-text>
</v-card>

$$P(A\cap B) = P(A)*P(B)$$

## Bayes Theorem

Bayes Theorem just provides another way to work out conditional probabilities. Mathematically, this can be simplified into the equation above. 

$$P(A \mid B) = \frac{P(B \mid A) P(A)}{P(B \mid A) P(A) + P(B \mid A^c) P(A^c)}$$

One benefit of Bayes’ Theorem is that we reverse the condition. Notice that we’re solving for A given B by using expressions of B given A. 

Imagine a situation where a test for HIV is only 95% accurate. Given the fact that someone has tested positive, what’s the probability that the person actually has HIV? This is an example where the direct probability cannot be known, but we can use the reverse conditions to still solve for an answer. Generally,

$$P(A|B) \neq P(B|A)$$

## Distributions

We also will take a moment to introduce three types of probability distributions:

1. Bernoulli Distribution - For when there are only 2 possibilities.
2. Uniform Distribution - For continuous variables. We define probabilities by integrating under a distribution.
3. Exponential Distribution - Also for continuous variables. 

### Bernoulli Distribution

A random variable X follows a distribution B with probability of success p. This can also be written as a function, which reads as: what is the probability that X is equal to (x) given p? This can also be called a “density” function.

$$f(X = x \mid p) = f(x \mid p) = p^x (1 - p)^{1 - x} I_{\{x \in \{0, 1\}\}}(x)$$

The expected value and variance is:

$$\mathbb{E}[X] = \sum_x x \, P(X = x)$$

$$\text{var}(X) = p(1 - p)$$

When there are (n) repeated trials, the result follows a Binomial Distribution. It is the sum of (n) independent Bernoulli’s.

### Uniform Distribution

For continuous variables, we define probabilities by integrating under a distribution. Consider the case below of a uniform distribution where X is equal to 1 given a certain range. This function is called the probability density function. 

1. It must be true that the integral of f(x) is equal to 1 from negative infinity to infinity.
2. The density must be greater than or equal to zero for all values of x.

### Exponential Distribution

These are also types of continuous distributions.

$$X \sim \text{Exp}(\lambda)$$

$$f(x \mid \lambda) = \lambda e^{-\lambda x}$$

$$\mathbb{E}[X] = \frac{1}{\lambda}$$

$$var(x) = \frac{1}{\lambda^2}$$

# Part 2 - Inference

<v-divider></v-divider>

## Frequentist Inference

We'll start by looking at inference in a frequentist approach, and then introduce Bayesian inference in the next section. 

### Confidence Intervals
A confidence interval is constructed around a point estimate of an unknown parameter, and tell you how the likely range which contains the true value of that parameter. For example, let’s say you calculate the 95% confidence interval of 160cm to 170cm for the average height of a population. This means you are 95% confident that the true average is in this range. 

*Note that confidence intervals are a distinctly Frequentist idea. This is in contrast to the Bayesian “credible interval”.*

The distribution of averages will follow a normal distribution

1. We know that the distribution will likely be normal. 
2. In a normal distribution a 95% confidence interval is defined as:

$$X \in [ \mu \pm 1.96 \sqrt{\sigma} ]$$

3. Using this value, we can calculate the range of (p) given our guess and the sample size. A smaller sample size will lead to a wider margin of our 95% confidence interval.

### Likelihood Function and Maximum Likelihood
Example. Consider a hospital, where 400 people were admitted to the hospital with heart attacks. A month later, 72 of them have died, and 328 of them have survived. What’s the mortality rate?

$$ Y_i \sim B(\theta) $$

$$ P(Y_i = 1) = \theta $$

$$P(Y_i = y \mid \theta) = P(Y_1 = y_1, Y_2 = y_2, \ldots) = \prod_{i=1}^n P(Y_i = y_i \mid \theta$$

$$\prod_{i=1}^n \theta^{y_i}(1 - \theta)^{1 - y_i}$$

### Likelihood Function
This is the probability of observing the actual data collected on the condition of the value of a parameter (theta). We often want to find the argument (theta) which maximizes the likelihood. In practice, people often maximize the logarithm of the likelihood. (Note that this assumes a Bernoulli distribution). 

$$L(\theta \mid \mathbf{y}) = \prod_{i=1}^n \theta^{y_i}(1 - \theta)^{1 - y_i}$$

$$\log(L(\theta)) = \left[\sum y_i \right]\log \theta + \left[\sum(1 - y_i)\right]\log(1 - \theta$$

To find the argmax of the previous equation, we can take the first derivative and set it equal to zero. With the estimate in hand, we can go further and assume a normal distribution to determine the range of (theta) of a 95% confidence interval, based on the MLE (which again, it determined by the observed data). 

## Bayesian Inference

Cumulative Distribution Function - the probability that X can take on some range of values. If we have an upper and lower bound, we can do something like: F( a < x < b ) = F(b) - F(a).

$$ F(x) = P (x \le x) $$

$$ F(x) = \sum f(t)$$

Likewise, we can flip this around. Given the percentile, we can find the parameter (p) that X takes at that percentile. 

### Inference Example: Frequentist
Suppose that you know there is a loaded coin that is 70% likely to result in heads. You are then presented with a coin, but you do not know if it is the loaded one. However, you are allowed to flip it a few times (5) and collect some data to inform your answer. If you get 2 heads and tails, what type of coin do you think it is? How confident are you?

*Notably, the second question is difficult to answer using a Frequentist paradigm. This is because the problem setup assumes the coin is either fair or not, and does not allow for any uncertainty. (I.e. it is either 0 or 1, and the math doesn’t work if it’s in the middle)*

$$\Theta = \{\text{fair}, \text{loaded}\}$$

$$X \sim \text{Bin}(5, ?)$$

$$f(x \mid \Theta) =
\begin{cases} 
\binom{5}{x} \left(\frac{1}{2}\right)^5 & \text{if fair} \\
\binom{5}{x} (0.7)^x (0.3)^{5-x} & \text{if loaded}
\end{cases}$$

### Inference Example: Bayesian
Allows you to incorporate prior information into the problem. Let’s say that we have an initial guess that the coin is 60% likely to be loaded. We can then look at the data and update our confidence using Bayes’ Theorem. 

$$f(\theta \mid x) = \frac{f(x \mid \theta) f(\theta)}{\sum_{\Theta} f(x \mid \theta) f(\theta)} \quad \text{(all possibilities of } \Theta\text{)}$$

$$= \binom{5}{x} \left[\left(\frac{1}{2}\right)^5 (0.4) I_{\text{fair}} + (0.7)^x (0.3)^{5-x} (0.6) I_{\text{loaded}} \right]$$

$$= 0.612 I_{\text{fair}} + 0.388 I_{\text{loaded}}$$

With this result, we can say that the probability that the coin is loaded, given that X = 2, is 0.388. We can think of this as an updated estimate (posterior) of our original belief (prior), given the presence of data. Notice that the final answer depends on your initial guess. This shows us how the Bayesian approach is inherently subjective. It merely “updates” your original estimate, rather than showing you some universal objective truth. 

$$f(\theta \mid y) = \frac{f(y \mid \theta) f(\theta)}{f(y)} \rightarrow \int f(y \mid \theta) f(\theta) \, d\theta$$

$$= \frac{liklihood \times prior}{normalizing constant}$$

Because this normalizing constant integral is often difficult to compute, sometimes we can ignore it and just look at the numerator. Once we figure out the numerator, we can find the constant such that the probabilities sum to 1. 

### Posterior Intervals
More discussion on integrating under the probability distribution to find the probability that Y is greater or less than some value. 


# Part 3 - Data Types

<v-divider></v-divider>

## Priors and Predictive Distributions

Given enough data, most priors will be outweighed by the data and will converge to a similar result. However, the prior cannot be 0 or 1 (as these will not converge). 

### Prior Predictive:
A distribution generated given our prior estimate of theta. (I.e. what is the value of X, given only our prior and no data?). In contrast, the marginal likelihood is computed in a similar way, but it serves as a normalizing constant which includes the data we’ve collected. 

### Predictive Interval:
Let’s say we calculate a 95% predictive interval of (10, 20) for a new independent variable X = 2. The interpretation of this calculation would be that if we select a new X equal to 2, the probability that Y will result in a value between 10 and 20 is 95%. 

*In other words, predictive intervals provide probability statements about a new observation.*

#### Example
Let’s take a coin flipping problem again. Let’s begin with an assumption that the coin can be of any fairness. Then we can write the likelihood as:

$$f(\theta) = I_{(0, 1)}$$

$$f(x) = \int f(x \mid \theta) f(\theta) \, d\theta$$

$$= \int_0^1 \frac{10!}{x! (10 - x)!} \theta^x (1 - \theta)^{10 - x} (1) \, d\theta$$

If we integrate this result, we will find that the value is equal to 1/11 for all values of x. This makes sense, basically we are saying that if all fairnesses are equally likely, then all possible values for x (the total number of heads given 10 flips) are equally likely as well. 

Now let’s assume that on the first flip, we get a heads. Now we can update our prior using this knowledge to predict a new distribution for theta given our new dataset, and use that to predict the next coin flip. 

## Bernoulli and Binomial Data
When we use a uniform prior, for a Bernoulli likelihood, we get a beta posterior.

$$f(y \mid \theta) = \theta^{\sum y_i} (1 - \theta)^{n - \sum y_i}$$

$$f(\theta) = I_{(0, 1)}$$

$$f(\theta \mid y) = \frac{f(y \mid \theta) f(\theta)}{f(y)}$$

$$\propto \theta^{\sum y_i} (1 - \theta)^{n - \sum y_i} \cdot I_{(0, 1)}$$

### Conjugate
A family of distributions are referred to as conjugate, if when you use a member of that family as the prior, you also get a member of that family as the posterior. We often use conjugate priors because it makes life simple (I.e. avoid intractable integrals). 

$$Y_1, Y_2, \ldots, Y_N \sim B(\theta) \quad \text{(likelihood)}$$

$$\theta \mid \alpha, \beta \sim \text{Beta}(\alpha, \beta) \quad \text{(prior)}$$

$$\alpha, \beta = \alpha_0, \beta_0 \quad \text{(hyperparameters)}$$

### Posterior Mean and Effective Sample Size
For the beta distribution in particular, we can compare the means, and see that the alpha and beta parameters in the prior, are direct weights of the prior. The greater alpha and beta, the more the prior will be weighted when solving for the posterior (I.e. this is like saying that there are a lot of datapoints in the sample size of the prior). 

$$\text{Beta} \left(\alpha + \sum y_i, \beta + n - \sum y_i \right)$$

$$\text{Posterior mean} = \frac{\alpha + \beta}{\alpha + \beta + n} \cdot \frac{\alpha}{\alpha + \beta} + \frac{n}{\alpha + \beta + n} \cdot \frac{\sum y_i}{n}$$

## Poisson Data
Poisson distributions are used for unbounded integer counts. For example, the total number of points scored in a hockey game. 

$$Y_i \sim \text{Pois}(\lambda)$$

$$f(y \mid \lambda) = \frac{\lambda^{\sum y_i} e^{-n\lambda}}{\prod_{i=1}^n y_i!} \quad \text{for } \lambda > 0$$

$$\lambda \sim \text{Gamma}(\alpha, \beta) \quad \text{(Gamma Prior)}$$

# Part 4 - Miscellaneous

<v-divider></v-divider>

## Exponential Data
An exponential distribution is conjugate to a gamma distribution. Note these equations are assuming 1 extra datapoint. Given multiple datapoints, the posterior gamma distribution would have alpha increase by (n), and beta increase by the sum of values of (Y). 

$$Y \sim \text{Exp}(\lambda)$$

$$f(\lambda \mid y) \propto \lambda^{(\alpha + 1) - 1} e^{-(\beta + y)\lambda} \quad \text{(posterior)}$$

$$\lambda \mid y \sim \Gamma(\alpha + 1, \beta + y)$$

## Normal Data
The normal distribution is conjugate to itself. 

$$X_i \sim N(\mu, \sigma^2)$$

$$\mu \sim N(m_0, s_0^2) \quad \text{(prior)}$$

$$\mu \mid x \sim N\left(
\frac{\frac{n \bar{x}}{\sigma^2} + \frac{m_0}{s_0^2}}{\frac{n}{\sigma^2} + \frac{1}{s_0^2}}, 
\frac{1}{\frac{n}{\sigma^2} + \frac{1}{s_0^2}}
\right)$$

## Alternative Priors

### Non-informative priors
We use non-informative priors when we want to minimize the influence of our prior. Consider the coin flip example from earlier. Let’s start with a uniform Beta(1,1) distribution. However, remember that the effective sample size is the sum of the two parameters. So we can choose smaller values. But note that Beta(0,0), because this doesn’t integrate to 1, is considered an improper prior. However, that doesn’t mean we can’t use it (as long as the posterior is still proper). 

For the normal distribution case, we can consider setting the average (mu) to zero, and the variance to a very large number (i.e. basically stretching out the curve). This is equivalent to a flat constant. 

#### Jeffreys Prior
The Jeffreys Prior is invariant under re-parametrization. This the accepted standard for a non-informative prior. 

$$f(\theta) \propto \sqrt{I(\theta)} \quad \text{(Fisher information)}$$

$$Y_i \sim N(\mu, \sigma^2) \quad f(\mu) \propto 1 \quad f(\sigma^2) \propto \frac{1}{\sigma^2}$$

$$Y_i \sim B(\theta) \quad f(\theta) \propto \theta^{-1/2} (1 - \theta)^{-1/2} \sim \text{Beta}\left(\frac{1}{2}, \frac{1}{2}\right)$$

### The Fisher Information

The Fisher Information is a measure of how much information a random variable X carries about an unknown parameter θ of a statistical model. It quantifies the amount of information available in the observed data to estimate the parameter θ.

$$I(\theta) = \mathbb{E} \left[ \left( \frac{d}{d\theta} \log f(X \mid \theta) \right)^2 \right]$$