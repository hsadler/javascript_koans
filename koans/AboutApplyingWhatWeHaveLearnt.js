var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = _(products).filter(function(prod)
      {
        var isNotShroom = function(ingred) {
          return ingred === 'mushrooms' ? false : true;
        };
        if(!prod.containsNuts && _(prod.ingredients).all(isNotShroom)) {
          return true;
        }
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var isMultipleOfThreeOrFive = function(num) {
      if(num % 3 === 0 || num % 5 === 0) {
        return true;
      } else return false;
    };

    var sumNums = function(memo, x) { return memo + x; };

    /* try chaining range() and reduce() */
    var sum = _(_.range(1000)).chain()
                  .filter(isMultipleOfThreeOrFive)
                  .reduce(sumNums, 0)
                  .value();

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            // console.log(ingredientCount[products[i].ingredients[j]]);
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    // console.log(ingredientCount);

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    var countIngredients = function(memo, x) {
      memo[x] = (memo[x] || 0) + 1;
      return memo;
    };

    /* chain() together map(), flatten() and reduce() */
    ingredientCount = _(products).chain()
                          .map(function(x) { return x.ingredients; })
                          .flatten()
                          .reduce(countIngredients, ingredientCount)
                          .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {
    var compositeNum = 38;

    var isPrime = function(n) {
      var test = true;
      var checkRange = _.range(2, n);
      checkRange.forEach(function(x) {
        if(n % x === 0) test = false;
      });
      return test;
    };

    var findGreaterPrime = function(memo, z) {
      if(isPrime(z) && z > memo) memo = z;
      return memo;
    };

    var largestPrimeFactor = _(_.range(2, (compositeNum / 2) + 1)).chain()
                                  .filter(function(x) { return compositeNum % x === 0; })
                                  .reduce(findGreaterPrime, 2)
                                  .value();

    expect(largestPrimeFactor).toBe(19);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    var isPalindrome = function(num) {
      num = num.toString().split('');
      var reverseNum = num.slice().reverse();
      return num.join('') === reverseNum.join('') ? true : false;
    };

    var hasTwoThreeDigitFactors = function(num) {
      var highestPossFact = Math.floor(num / 100);
      var lowestPossFact = Math.floor(num / 999);
      var rangeNums = _.range(highestPossFact, lowestPossFact, -1).filter(function(x) {
        return x > 99 && x < 1000;
      });
      return _(rangeNums).any(function(x) {
        return (num % x === 0 && (num / x).toString().length === 3);
      });
    };

    var palindromList = _(_.range(999 * 999, 100 * 100, -1)).filter(isPalindrome);
    var largestPalendrome = _(palindromList).filter(hasTwoThreeDigitFactors)[0];

    expect(largestPalendrome).toBe(906609);

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {

    var rangeOneToTwenty = _.range(1, 21);

    var isDivisibleByAllNums = function(num, range) {
      return _(range).reduce(function(memo, x) {
        if(num % x !== 0) {
          memo = false;
        }
        return memo;
      }, true);
    };

    var smallestNumDiv = (function() {
      var counter = 20;
      while(!isDivisibleByAllNums(counter, rangeOneToTwenty)) {
        counter += 20;
      }
      return counter;
    })();

    expect(smallestNumDiv).toBe(232792560);

  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

    var getSumSquares = function(rangeArr) {
      return _.reduce(rangeArr, function(memo, x) {
        return memo + Math.pow(x, 2);
      }, 0);
    };

    var getSquareSums = function(rangeArr) {
      return Math.pow(_.reduce(rangeArr, function(memo, x) {return memo + x;}, 0), 2);
    };

    var diffSumSquaresSquareSums = (function(number) {
      var numRange = _.range(1, number + 1);
      return Math.abs(getSumSquares(numRange) - getSquareSums(numRange));
    })(55);

    expect(diffSumSquaresSquareSums).toBe(2314620);

  });

  it("should find the 10001st prime", function () {

  });

});
