
'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.64a70a34-2da8-4daf-8163-a1ba7e66d101';  // TODO replace with your app ID (OPTIONAL).

var SKILL_NAME = 'See and Say';
var HELP_MESSAGE = 'You can say pull it, spin it, use one of the animals names featured in this Skill a list can be found in the Alexa app, or yes please... Which would you like?';
var HELP_REPROMPT = 'You can say pull it, spin it, use one of the animals names featured in this Skill a list can be found in the Alexa app, or yes please... Which would you like?';
var HELP_PROMPT = 'Examples of what you can say are listed below: ';
var STOP_MESSAGE = 'Thanks for spinning, Goodbye!';

var animals = [
    "The dog says" + "<audio src='https://s3.amazonaws.com/seeandsay/dog.mp3' />",
    "The cat says" + "<audio src='https://s3.amazonaws.com/seeandsay/cat.mp3' />",
    "The lion says" + "<audio src='https://s3.amazonaws.com/seeandsay/lion.mp3' />",
    "The frog says" + "<audio src='https://s3.amazonaws.com/seeandsay/frog.mp3' />",
    "The elephants says" + "<audio src='https://s3.amazonaws.com/seeandsay/elephant.mp3' />",
    "The duck says" + "<audio src='https://s3.amazonaws.com/seeandsay/duck.mp3' />",
    "The sheep says" + "<audio src='https://s3.amazonaws.com/seeandsay/lamb.mp3' />",
    "The Hippopotamuses says" + "<audio src='https://s3.amazonaws.com/seeandsay/hippo.mp3' />",
    "The pig says" + "<audio src='https://s3.amazonaws.com/seeandsay/pig.mp3' />",
    "The monkey says" + "<audio src='https://s3.amazonaws.com/seeandsay/monkey.mp3' />",
    "The chicken says" + "<audio src='https://s3.amazonaws.com/seeandsay/chickenClucking.mp3' />",
    "The goat says" + "<audio src='https://s3.amazonaws.com/seeandsay/goat.mp3' />",
    "The bear says" + "<audio src='https://s3.amazonaws.com/seeandsay/bear.mp3' />",
    "The cow says" + "<audio src='https://s3.amazonaws.com/seeandsay/cowmoo.mp3' />",
    "The donkey says" + "<audio src='https://s3.amazonaws.com/seeandsay/donkey.mp3' />",
    "The horse says" + "<audio src='https://s3.amazonaws.com/seeandsay/horse.mp3' />",
    "The fox says" + "<audio src='https://s3.amazonaws.com/seeandsay/fox.mp3' />",
    "The owl says" + "<audio src='https://s3.amazonaws.com/seeandsay/owlhoot.mp3' />",
    "The lamb says" + "<audio src='https://s3.amazonaws.com/seeandsay/lamb.mp3' />",
    "The rooster says" + "<audio src='https://s3.amazonaws.com/seeandsay/roosterSF.mp3' />",
    //V2//
    "The alligator says" + "<audio src='https://s3.amazonaws.com/seeandsay/aligator.mp3' />",
    "The bat says" + "<audio src='https://s3.amazonaws.com/seeandsay/bats.mp3' />",
    "The bumble bee says" + "<audio src='https://s3.amazonaws.com/seeandsay/bee.mp3' />",
    "The bald eagle says" + "<audio src='https://s3.amazonaws.com/seeandsay/baldEagle.mp3' />",
    "The parrot says" + "<audio src='https://s3.amazonaws.com/seeandsay/parrot.mp3' />",
    "The penguin says" + "<audio src='https://s3.amazonaws.com/seeandsay/penguin.mp3' />",
    "The toucan says" + "<audio src='https://s3.amazonaws.com/seeandsay/toucan.mp3' />",
    "The seal says" + "<audio src='https://s3.amazonaws.com/seeandsay/seal.mp3' />",
    "The sea lion says" + "<audio src='https://s3.amazonaws.com/seeandsay/sealion.mp3' />",
    "The whale says" + "<audio src='https://s3.amazonaws.com/seeandsay/whale.mp3' />"
];

var manySound = [
  "<audio src='https://s3.amazonaws.com/seeandsay/pullOne.mp3' />" + "The animals say" + "<audio src='https://s3.amazonaws.com/seeandsay/lamb.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/owlhoot.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/monkey.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/lion.mp3' />",
  "<audio src='https://s3.amazonaws.com/seeandsay/pullTwo.mp3' />" + "The animals say" + "<audio src='https://s3.amazonaws.com/seeandsay/roosterSF.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/fox.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/bear.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/goat.mp3' />",
  "<audio src='https://s3.amazonaws.com/seeandsay/pullThree.mp3' />" + "The animals say" + "<audio src='https://s3.amazonaws.com/seeandsay/chickenClucking.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/donkey.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/horse.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/duck.mp3' />",
  "<audio src='https://s3.amazonaws.com/seeandsay/pullFour.mp3' />" + "The animals say" + "<audio src='https://s3.amazonaws.com/seeandsay/bats.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/parrot.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/whale.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/penguin.mp3' />"
];

var pulls = [
  "<audio src='https://s3.amazonaws.com/seeandsay/pullOne.mp3' />",
  "<audio src='https://s3.amazonaws.com/seeandsay/pullTwo.mp3' />",
  "<audio src='https://s3.amazonaws.com/seeandsay/pullThree.mp3' />",
  "<audio src='https://s3.amazonaws.com/seeandsay/pullFour.mp3' />"
];

var facts = [
  //Dogs//
  "Dog have superior hearing compared to humans, capable of hearing sounds at four times the distance.",
  "Dogs have a remarkable sense of smell, they are capable of differentiating odors nearly 100 million times lower than humans can.",
  "The average life span for a dog is around 10 to 14 years.",
  "Those involved in dog breeding refer to males as 'dogs', females as 'bitches', dogs younger than a year old as 'puppies' and a group of offspring as a 'litter'.",
  "Domestic dogs are omnivores, they feed on a variety of foods including grains, vegetables and meats.",
  "A large dog’s resting heart beats between 60 and 100 times per minute.",
  "A small dog's resting heart beats between 100 and 140 times per minute.",
  "Dogs have about 1,700 taste buds.",
  "Dogs kick after going to the bathroom, to use the scent glands on their paws to mark their territory.",
  "A Dog’s sense of smell is 10,000 – 100,000 times more acute as that of humans.",
  "45% of dogs sleep in their owner’s bed.",
  "Puppies have 28 teeth and adult dogs have 42.",
  "Adult dogs have 42 teeth.",
  "Puppies can sleep 18 to 20 hours a day during the rapid body growth phase.",
  "The Greyhound, can run up to 44 miles per hour.",
  "There are 400 million dogs in the world.",
  "Dogs can see best at dawn and dusk.",
  "The average number of puppies in a litter ranges from four to six.",
  "Dogs sweat through the pads on their feet.",
  "Petting a dog has shown to lower the human's blood pressure.",
  "The Boy Scouts and Girl Scouts both offer merit badges in dog care.",
  "Female dogs carry puppies for about nine weeks before birth.",
  "Dogs can be taught to count and solve simple math problems.",
  //Cats//
  "Cats are the most, popular pet in the world.",
  "There are over 500 million domestic cats in the world.",
  "Cats and humans have been associated for nearly 10000 years.",
  "Cats conserve energy by sleeping for an average of 13 to 14 hours a day",
  "On average cats live for around 12 to 15 years.",
  "An adult cat has 30 teeth.",
  "The average cat sleeps 13 to 14 hours per day.",
  "A female cat carries her kittens for about 58 to 65 days before they are born.",
  "A cat can jump approximately seven times it's height.",
  "A cat’s sense of smell is approximately 14 times greater than that of a human.",
  "A cat’s whiskers helps them detect objects and navigate in the dark",
  "cats greet one another by touching their noses together.",
  "A group of kittens is called a kindle.",
  "A group of adult cats is called a clowder.",
  "Cats have five toes on each front paw, but only four toes on each back paw.",
  //Lion//
  "Lions are the second largest big cat species in the world, behind tigers.",
  "The average male lion weighs around 180 kg (400 lb) while the average female lion weighs around 130 kg (290 lb)",
  "The heaviest lion on record weighed an amazing 375 kg (826 lbs)",
  "Lions can reach speeds of up to 81 kph (50 mph) but only in short bursts because of a lack of stamina",
  "The roar of a lion can be heard from 8 kilometers (5.0 miles) away",
  "Most lions found in the wild live in southern and eastern parts of Africa",
  "Lions can leap as far as 36 feet.",
  "Lions eat about 20 pounds of meat per day.",
  "Only about 1 in 8 male lions survive to adulthood.",
  "The darker a male lion’s mane, the older he usually is.",
  "A Turkish proverb states: A lion sleeps in the heart of every brave man.",
  "Lions can open their jaws up to 1 foot, larger than a human head.",
  "The African lion’s loose-skin belly allows it to be kicked by prey with little chance of injury.",
  "A lioness and male jaguar hybrid is known as a jaglion.",
  "A lion’s pupil is three times as big as a human’s.",
  "Lions can be several different colors, including tan, brown, yellow, and red.",
  "A lion pride’s territory can be up to 100 square miles.",
  "Lions can sleep up to 22 hours a day.",
  //Frogs//
  "Tadpoles look more like fish than frogs, they have long finned tails and breathe through gills",
  "An amphibian can live both on land and in water",
  "Although frogs live on land their habitat must be near swamps, ponds or in a damp place. This is because they will die if their skin dries out",
  "Instead of drinking water, frogs soak it into their body through their skin",
  "Frogs breathe through their nostrils while also absorbing about half the air they need through their skin",
  //Elephants//
  "The elephant's trunk is able to sense the size, shape and temperature of an object.",
  "An elephant uses its trunk to lift food and suck up water then pour it into its mouth",
  "An elephant's trunk can grow to be about 2 metres long and can weigh up to 140 kg.",
  "Scientists believe that an elephant's trunk is made up of 100,000 muscles, but no bones",
  "Female elephants spend their entire lives living in large groups called herds.",
  "Male elephant leave their herds at about 13 years old and live fairly solitary lives from then on.",
  "Elephants can swim, they use their trunk to breathe like a snorkel in deep water.",
  "Elephants are herbivores and can spend up to 16 hours a day collecting leaves, twigs, bamboo and roots.",
  //Duck//
  "The duck is a number of species in the Anatidae family of birds. They are related to swans and geese",
  "Ducks are mostly aquatic birds living in both fresh water, sea water, and found on every continent except for Antarctica",
  "A male duck is called a drake",
  "A female duck is called a hen",
  "A baby duck is called a duckling",
  "Ducks are omnivores. They feed on aquatic plants, small fish, insects, worms, grubs and more. People often feed domesticated ducks bread",
  "Diving ducks and sea ducks search for food fairly deep underwater. To be able to stay underwater more easily, diving ducks are quite heavy",
  //Sheep//
  "There are over 1 billion sheep in the world",
  "China has the largest number of sheep in the world",
  "Adult female sheep are known as ewes",
  "Adult male sheep are known as rams",
  //Hippo//
  "The name hippopotamus means river horse and is often shortened to hippo",
  "The hippopotamus is generally considered the third largest land mammal (after the White rhinoceros and elephant)",
  "Hippopotamuses spend a large amount of time in water such as rivers, lakes and swamps",
  "Resting in water helps keep a hippopotamuses temperature down",
  "Hippopotamuses give birth in the water",
  //Pigs//
  "Like humans, pigs are omnivores, meaning they eat both plants and other animals.",
  "A pig snout is an important tool for finding food in the ground and sensing the world around them.",
  "Pigs have an excellent sense of smell.",
  "There are around 2 billion pigs in the world.",
  "Humans farm pigs for meat such as pork, bacon and ham.",
  "Pigs have 44 teeth.",
  "Pigs have 4 toes on each hoof, but use only half of them to walk.",
  "Pig is part of the Chinese zodiac, brining fortune and happiness.",
  "Not all pigs have curly tails.",
  "Piglets respond to their names at about 20 days of age",
  "Mommy Pig's or Sow’s pregnancy lasts 114 days and can give birth to between 7 and 12 piglets, two times per year.",
  "Pigs are quite intelligent and learn tricks faster than dogs.",
  "A litter of piglets is called a farrow.",
  "A piglet weighs about 3 pounds at birth and will double in size a week later.",
  "Pigs have no sweat glands and roll around in the mud to lower their body temperature.",
  "Pigs run at a speed of 11.5 mph or almost 20 km/h.",
  //Monkey//
  "There are currently 264 known monkey species in the world.",
  "Monkeys can be divided into two groups, Old World monkeys that live in Africa and Asia and New World monkeys that live in South America.",
  "A baboon is an example of an Old World monkey, while a marmoset is an example of a New World monkey.",
  "Apes are not monkeys.",
  "Some monkeys live on the ground, while others live in trees.",
  //Chickens//
  "Chickens have a great memory. They can distinguish between over 100 different faces of people or animals.",
  "Chickens have full-color vision.",
  "They actually dream while they sleep.",
  "Chickens can feel pain and distress.",
  "Over 452 million hens are used a year for eggs.",
  "There are over 25 billion Chickens in the world, that's more than any other bird.",
  "Chickens are omnivores. They’ll eat seeds and insects, but also larger prey like small mice and lizards.",
  "The chicken was the first bird to have its genome sequenced, in 2004.",
  "A rooster announces to a flock of chickens that he’s found food with a “took, took, took.” But hens don’t pay attention if they already know where the food is.",
  "Chickens aren’t completely flightless, they can get airborne enough to make it over a fence or into a tree.",
  //Goat Facts//
  "Goats generally live 10 to 12 years. There have been cases of goats living up to 15 years.",
  "Goats were one of the first animals to be tamed by humans and were being herded over 9,000 years ago.",
  "Goats are a member of the cattle family and are believed to be descended from the wild goat, bezoar.",
  "The main products associated with goats are milk, cheese, meat, mohair, and cashmere. Larger dairy goats produce 3,000 to 5,000 pounds of milk each year.",
  "Goats can be taught their name and to come when called.",
  //Bear//
  "Bears live as long as 30 years in the wild. One captive brown bear lived to the age of 47.",
  "Bears can run up to 40 miles per hour, fast enough to catch a running horse. The fastest known human alive today is Usain Bolt, who can run 27mph.",
  "Only the polar bear is a true carnivore, All other bears are omnivores, or animals that eat both plants and meat.",
  "A bear's normal heartbeat is 40 beats per minute.",
  "A hibernating bear's heart rate can drop to 8 bpm.",
  "A polar bear's stomach can hold 150 lbs. (68 kg) of meat.",
  "The symbol of the United Russia Party is a bear.",
  "Bears are traditionally a symbol of pride and power in Russia.",
  "Spectacled bears are the only wild bears that live in South America.",
  "Polar bears have a thick coat with about 9,600 hairs per square inch",
  "The claws on the front feet of bears are longer than the claws on the back feet.",
  "Bears can have claws up to 5 inches long.",
  "The Asiatic black bear has the largest ears of any species of bears.",
  "Around 1,000 giant pandas bears are live in the wild today.",
  "Most bears have 42 teeth",
  "Polar bears are the largest land predators on earth.",
  "Polar bears can stand more than 11' high and weigh more than 1,700 lbs.",
  "Unlike many mammals, bears can see in color.",
  "A polar bear can jump 8 ft. out of the water to surprise it's prey.",
  "Koala bears are not bears at all and are not related to the bear family. They are marsupials.",
  "98% of the grizzly bear population in the U.S., lives in Alaska.",
  //Cow//
  "There is over 1 billion cattle in the world.",
  "Cattle are sacred in India, There are an estimated 300 million cattle in India.",
  "Cattle are red/green color blind.",
  "Cattle are herbivores that eat vegetation such as grass.",
  "Cattle stomachs have four chambers which help break down what they eat.",
  "An average dairy cow weighs about 1,200 pounds.",
  "A cow’s heart beats between 60 and 70 beats per minute.",
  "Cows can hear lower and higher frequencies better than humans.",
  "The average cow drinks 30 to 50 gallons of water each day.",
  "The average cow produces 70 lbs. of milk or 8 gallons per day.",
  "The average cow will eat about 100 lbs. of feed per day.",
  "Cows actually do not bite grass; instead they curl their tongue around it.",
  "Cows have a single stomach, but four different digestive compartments.",
  "Cows are pregnant for 9 months like humans.",
  //Donkey//
  "A boy donkey is called a jack.",
  "A girl donkey is called a jenny",
  "There are wild donkeys in Mexico, Arizona, Nevada, Texas and Mississippi",
  "Donkeys live up to 40 years if given proper care",
  "Like horses, donkeys eat grains and grass",
  "China has more donkeys than any other country in the world",
  //Horse//
  "Horses can sleep both lying down and standing up.",
  "Horses can run shortly after birth.",
  "Domestic horses have a lifespan of around 25 years.",
  "Horses have been domesticated for over 5000 years.",
  "A male horse is called a stallion.",
  "A female horse is called a mare.",
  "A horse is measured in hands. A hand equals 4 inches or the width of a human hand. The tallest horse ever recorded was a Shire called Samson. He stood 7 feet 2 inches tall (21.2 and a half hands).",
  "Horses have 2 blind spots where they can’t see. One is directly behind them and the other is directly in front of them.",
  "A horse’s father is called a sire and the mother of a horse is called a dam.",
  "A pony is not a baby horse. It is a fully grown horse that is small.",
  "When a baby horse is first born it is called a foal.",
  "Mares or mommy horses produce milk for their young and will feed them for several months.",
  "Foals or baby horses can focus their eyes almost as soon as they are born and cut their first teeth within a week.",
  "Horses are fully grown by 4 years of age.",
  "Horses have a good memory. If you’ve been with the same horse for a long time, they will remember you.",
  "Horses shoes need to be removed and their hooves trimmed every 6 weeks.",
  "The person who cares for a horse’s feet is called a farrier or blacksmith.",
  "Horses have small stomachs for their size and need to eat little and often. When in a field, horses will graze for most of the day.",
  "Horses can drink up to ten gallons of water a day.",
  //Fox//
  "Depending on the species, foxes range in size. They usually weigh 13 pounds, like a small to medium sized dog.",
  "Foxes can run fast up to 30 mph, thanks to their slender body.",
  "Foxes share some similarities with cats. They have retractable claws and vertical pupils.",
  "For Foxes pregnancy lasts 53 days and it ends with 3 to 6 pups, They are unable to see, hear or walk in the first couple of days of their life and depend completely on their mother.",
  "Fox can live up to 3 years in the wild and up to 10 years in captivity.",
  //Owl//
  "There are around 200 different owl species.",
  "Owls are active at night (nocturnal).",
  "Owls can turn their heads 270 degrees.",
  "Owls are farsighted, meaning they can't see things close clearly.",
  "Owls are very quiet in flight compared to other birds of prey.",
  //V2//
  //Alligator//
  "Aalligators are cold-blooded.",
  "Alligators can weigh over 450 kg 1000 lb.",
  "American alligators live in south-eastern areas of the United States such as Florida and Louisiana.",
  "Alligators eat a range of different animals such as fish, birds, turtles and even deer.",
  "Alligators have been living on Earth for millions of years and are sometimes described as living fossils.",
  //Bats//
  "Bats are the only mammals capable of continued flight.",
  "There are over 1000 different bat species.",
  "Bats are nocturnal, active at night.",
  "Most bats feed on insects, while others eat fruit, fish or even blood.",
  "Bats can live for over 20 years.",
  //Bees//
  "There are over 250 known species of bumble bees.",
  "A bee's buzz is not produced by the beating of its wings but by vibrating muscles.",
  "Bees have two pairs of wings, the larger fore wings and the smaller hind wings.",
  "Honey is made from the nectar and sweet deposits that bees collect from plants and trees. Honey is stored in honeycomb as a food source for the colony.",
  "There are 9 different families of bees and around 20,000 known species.",
  //Bald Eagle//
  "Bald Eagles are found in North America.",
  "The Great Seal of the United States features a bald eagle.",
  "The bald eagle is the national bird of the United States.",
  "Although their name suggests otherwise, bald eagles are not bald.",
  "Female bald eagles are larger than male bald eagles.",
  //Parrot//
  "There are around 372 different parrot species.",
  "Most parrots live in tropical areas.",
  "Parrots have curved bills or beaks, strong legs and clawed feet.",
  "Parrots are often brightly colored.",
  "Parrots are believed to be one of the most intelligent bird species.",
  //Penguin//
  "Penguins are flightless birds.",
  "While other birds have wings for flying, penguins have adapted flippers to help them swim in the water.",
  "Most penguins live in the Southern Hemisphere.",
  "The Galapagos Penguin is the only penguin specie that ventures north of the equator in the wild.",
  "Large penguin populations can be found in countries such as New Zealand, Australia, Chile, Argentina and South Africa.",
  "No penguins live at the North Pole.",
  "Penguins can drink sea water.",
  //Toucan//
  "Toucan's have long narrow tongues up to 15 cm or 6 in long.",
  "Toucans are one of the nosier jungle birds.",
  "Toucans can live for up to 20 years.",
  "Since the 1960's, Toucan Sam, a cartoon mascot, has been used as the face of Kellogg's breakfast cereal Fruit Loops.",
  "Toucans live together in small-sized flocks, they make nests in tree hollows or holes that have often be created by their distant cousin the woodpecker.",
  "Toucans mainly eat fruit, but sometimes prey on insects and small lizards.",
  //Seal//
  "There are around 33 species of seals.",
  "Seals are believed to have evolved from land based, bear or otter-like ancestors.",
  "Seals are semiaquatic marine mammals. They have four flippers, so they are in a category of animals known as pinnipedia which means fin-footed.",
  "Because they can spend months at sea, seals can sleep underwater.",
  "Some seal species can hold their breath for nearly two hours underwater by slowing their heart beat and conserving oxygen.",
  //Sea lion//
  "The average life span of a sea lion is about 20 years.",
  "Pups or baby sea lions weigh about 13-20 pounds and are 2.5 feet long when they are born.",
  "Sea lions can swim at burst speeds up to 25 miles per hour, but most of the time they swim around 11 miles per hour.",
  "Sea lions have about 38 teeth, which they use to catch their food, They don't use them to chew their food though, they swallow it whole.",
  "Females can weigh between 200 and 400 pounds and can be up to 6.5 feet long.",
  "Male sea lions tend to be larger than females, weighing about 600 to 800 pounds and can be up to 8 feet long.",
  //Whales//
  "To breathe, whales have a blowhole in the top of their heads. When they reach the surface, they take air in through this blowhole.",
  "Whales can swim as fast as 30 miles per hour.",
  "Some Whales can stay underwater for as long as 90 minutes.",
  "The Blue whale is the largest animal in the world.",
  "Some baleen whales sing, Particularly the blue whales and the humpback whales are well known for singing."

];

var bearFacts = [
  "Bears live as long as 30 years in the wild. One captive brown bear lived to the age of 47.",
  "Bears can run up to 40 miles per hour, fast enough to catch a running horse. The fastest known human alive today is Usain Bolt, who can run 27mph.",
  "Only the polar bear is a true carnivore, All other bears are omnivores, or animals that eat both plants and meat.",
  "A bear's normal heartbeat is 40 beats per minute.",
  "A hibernating bear's heart rate can drop to 8 bpm.",
  "A polar bear's stomach can hold 150 lbs. (68 kg) of meat."
  "The symbol of the United Russia Party is a bear.",
  "Bears are traditionally a symbol of pride and power in Russia.",
  "Spectacled bears are the only wild bears that live in South America.",
  "Polar bears have a thick coat with about 9,600 hairs per square inch",
  "The claws on the front feet of bears are longer than the claws on the back feet.",
  "Bears can have claws up to 5 inches long.",
  "The Asiatic black bear has the largest ears of any species of bears.",
  "Around 1,000 giant pandas bears are live in the wild today.",
  "Most bears have 42 teeth",
  "Polar bears are the largest land predators on earth.",
  "Polar bears can stand more than 11' high and weigh more than 1,700 lbs.",
  "Unlike many mammals, bears can see in color.",
  "A polar bear can jump 8 ft. out of the water to surprise it's prey.",
  "Koala bears are not bears at all and are not related to the bear family. They are marsupials.",
  "98% of the grizzly bear population in the U.S., lives in Alaska."

];

var catFacts = [
  "Cats are the most, popular pet in the world.",
  "There are over 500 million domestic cats in the world.",
  "Cats and humans have been associated for nearly 10000 years.",
  "Cats conserve energy by sleeping for an average of 13 to 14 hours a day",
  "On average cats live for around 12 to 15 years.",
  "An adult cat has 30 teeth.",
  "The average cat sleeps 13 to 14 hours per day.",
  "A female cat carries her kittens for about 58 to 65 days before they are born.",
  "A cat can jump approximately seven times it's height.",
  "A cat’s sense of smell is approximately 14 times greater than that of a human.",
  "A cat’s whiskers helps them detect objects and navigate in the dark",
  "cats greet one another by touching their noses together.",
  "A group of kittens is called a kindle.",
  "A group of adult cats is called a clowder.",
  "Cats have five toes on each front paw, but only four toes on each back paw."

];

var dogFacts = [
  "Dog have superior hearing compared to humans, capable of hearing sounds at four times the distance.",
  "Dogs have a remarkable sense of smell, they are capable of differentiating odors nearly 100 million times lower than humans can.",
  "The average life span for a dog is around 10 to 14 years.",
  "Those involved in dog breeding refer to males as 'dogs', females as 'bitches', dogs younger than a year old as 'puppies' and a group of offspring as a 'litter'.",
  "Domestic dogs are omnivores, they feed on a variety of foods including grains, vegetables and meats.",
  "A large dog’s resting heart beats between 60 and 100 times per minute.",
  "A small dog's resting heart beats between 100 and 140 times per minute.",
  "Dogs have about 1,700 taste buds.",
  "Dogs kick after going to the bathroom, to use the scent glands on their paws to mark their territory.",
  "A Dog’s sense of smell is 10,000 – 100,000 times more acute as that of humans.",
  "45% of dogs sleep in their owner’s bed.",
  "Puppies have 28 teeth and adult dogs have 42.",
  "Adult dogs have 42 teeth.",
  "Puppies can sleep 18 to 20 hours a day during the rapid body growth phase.",
  "The Greyhound, can run up to 44 miles per hour.",
  "There are 400 million dogs in the world.",
  "Dogs can see best at dawn and dusk.",
  "The average number of puppies in a litter ranges from four to six.",
  "Dogs sweat through the pads on their feet.",
  "Petting a dog has shown to lower the human's blood pressure.",
  "The Boy Scouts and Girl Scouts both offer merit badges in dog care.",
  "Female dogs carry puppies for about nine weeks before birth.",
  "Dogs can be taught to count and solve simple math problems."
];

var donkeyFacts = [
  "A boy donkey is called a jack.",
  "A girl donkey is called a jenny",
  "There are wild donkeys in Mexico, Arizona, Nevada, Texas and Mississippi",
  "Donkeys live up to 40 years if given proper care",
  "Like horses, donkeys eat grains and grass",
  "China has more donkeys than any other country in the world",

];

var duckFacts = [
  "The duck is a number of species in the Anatidae family of birds. They are related to swans and geese",
  "Ducks are mostly aquatic birds living in both fresh water, sea water, and found on every continent except for Antarctica",
  "A male duck is called a drake",
  "A female duck is called a hen",
  "A baby duck is called a duckling",
  "Ducks are omnivores. They feed on aquatic plants, small fish, insects, worms, grubs and more. People often feed domesticated ducks bread",
  "Diving ducks and sea ducks search for food fairly deep underwater. To be able to stay underwater more easily, diving ducks are quite heavy"

];

var cowFacts = [
  "There is over 1 billion cattle in the world.",
  "Cattle are sacred in India, There are an estimated 300 million cattle in India.",
  "Cattle are red/green color blind.",
  "Cattle are herbivores that eat vegetation such as grass.",
  "Cattle stomachs have four chambers which help break down what they eat.",
  "An average dairy cow weighs about 1,200 pounds.",
  "A cow’s heart beats between 60 and 70 beats per minute.",
  "Cows can hear lower and higher frequencies better than humans.",
  "The average cow drinks 30 to 50 gallons of water each day.",
  "The average cow produces 70 lbs. of milk or 8 gallons per day.",
  "The average cow will eat about 100 lbs. of feed per day.",
  "Cows actually do not bite grass; instead they curl their tongue around it.",
  "Cows have a single stomach, but four different digestive compartments.",
  "Cows are pregnant for 9 months like humans."

];

var chickenFacts = [
  "Chickens have a great memory. They can distinguish between over 100 different faces of people or animals.",
  "Chickens have full-color vision.",
  "They actually dream while they sleep.",
  "Chickens can feel pain and distress.",
  "Over 452 million hens are used a year for eggs.",
  "There are over 25 billion Chickens in the world, that's more than any other bird.",
  "Chickens are omnivores. They’ll eat seeds and insects, but also larger prey like small mice and lizards.",
  "The chicken was the first bird to have its genome sequenced, in 2004.",
  "A rooster announces to a flock of chickens that he’s found food with a “took, took, took.” But hens don’t pay attention if they already know where the food is.",
  "Chickens aren’t completely flightless, they can get airborne enough to make it over a fence or into a tree."

];

var goatFacts = [
  "Goats generally live 10 to 12 years. There have been cases of goats living up to 15 years.",
  "Goats were one of the first animals to be tamed by humans and were being herded over 9,000 years ago.",
  "Goats are a member of the cattle family and are believed to be descended from the wild goat, bezoar.",
  "The main products associated with goats are milk, cheese, meat, mohair, and cashmere. Larger dairy goats produce 3,000 to 5,000 pounds of milk each year.",
  "Goats can be taught their name and to come when called."

];

var elephantFacts = [
  "The elephant's trunk is able to sense the size, shape and temperature of an object.",
  "An elephant uses its trunk to lift food and suck up water then pour it into its mouth",
  "An elephant's trunk can grow to be about 2 metres long and can weigh up to 140 kg.",
  "Scientists believe that an elephant's trunk is made up of 100,000 muscles, but no bones",
  "Female elephants spend their entire lives living in large groups called herds.",
  "Male elephant leave their herds at about 13 years old and live fairly solitary lives from then on.",
  "Elephants can swim, they use their trunk to breathe like a snorkel in deep water.",
  "Elephants are herbivores and can spend up to 16 hours a day collecting leaves, twigs, bamboo and roots."

];

var frogFacts = [
  "Tadpoles look more like fish than frogs, they have long finned tails and breathe through gills",
  "An amphibian can live both on land and in water",
  "Although frogs live on land their habitat must be near swamps, ponds or in a damp place. This is because they will die if their skin dries out",
  "Instead of drinking water, frogs soak it into their body through their skin",
  "Frogs breathe through their nostrils while also absorbing about half the air they need through their skin"

];

var foxFacts = [
  "Depending on the species, foxes range in size. They usually weigh 13 pounds, like a small to medium sized dog.",
  "Foxes can run fast up to 30 mph, thanks to their slender body.",
  "Foxes share some similarities with cats. They have retractable claws and vertical pupils.",
  "For Foxes pregnancy lasts 53 days and it ends with 3 to 6 pups, They are unable to see, hear or walk in the first couple of days of their life and depend completely on their mother.",
  "Fox can live up to 3 years in the wild and up to 10 years in captivity."

];

var owlFacts = [
  "There are around 200 different owl species.",
  "Owls are active at night (nocturnal).",
  "Owls can turn their heads 270 degrees.",
  "Owls are farsighted, meaning they can't see things close clearly.",
  "Owls are very quiet in flight compared to other birds of prey."

];

var horseFacts = [
  "Horses can sleep both lying down and standing up.",
  "Horses can run shortly after birth.",
  "Domestic horses have a lifespan of around 25 years.",
  "Horses have been domesticated for over 5000 years.",
  "A male horse is called a stallion.",
  "A female horse is called a mare.",
  "A horse is measured in hands. A hand equals 4 inches or the width of a human hand. The tallest horse ever recorded was a Shire called Samson. He stood 7 feet 2 inches tall (21.2 and a half hands).",
  "Horses have 2 blind spots where they can’t see. One is directly behind them and the other is directly in front of them.",
  "A horse’s father is called a sire and the mother of a horse is called a dam.",
  "A pony is not a baby horse. It is a fully grown horse that is small.",
  "When a baby horse is first born it is called a foal.",
  "Mares or mommy horses produce milk for their young and will feed them for several months.",
  "Foals or baby horses can focus their eyes almost as soon as they are born and cut their first teeth within a week.",
  "Horses are fully grown by 4 years of age.",
  "Horses have a good memory. If you’ve been with the same horse for a long time, they will remember you.",
  "Horses shoes need to be removed and their hooves trimmed every 6 weeks.",
  "The person who cares for a horse’s feet is called a farrier or blacksmith.",
  "Horses have small stomachs for their size and need to eat little and often. When in a field, horses will graze for most of the day.",
  "Horses can drink up to ten gallons of water a day."

];

var monkeyFacts = [
  "There are currently 264 known monkey species in the world.",
  "Monkeys can be divided into two groups, Old World monkeys that live in Africa and Asia and New World monkeys that live in South America.",
  "A baboon is an example of an Old World monkey, while a marmoset is an example of a New World monkey.",
  "Apes are not monkeys.",
  "Some monkeys live on the ground, while others live in trees."

];

var pigFacts = [
  "Like humans, pigs are omnivores, meaning they eat both plants and other animals.",
  "A pig snout is an important tool for finding food in the ground and sensing the world around them.",
  "Pigs have an excellent sense of smell.",
  "There are around 2 billion pigs in the world.",
  "Humans farm pigs for meat such as pork, bacon and ham.",
  "Pigs have 44 teeth.",
  "Pigs have 4 toes on each hoof, but use only half of them to walk.",
  "Pig is part of the Chinese zodiac, brining fortune and happiness.",
  "Not all pigs have curly tails.",
  "Piglets respond to their names at about 20 days of age",
  "Mommy Pig's or Sow’s pregnancy lasts 114 days and can give birth to between 7 and 12 piglets, two times per year.",
  "Pigs are quite intelligent and learn tricks faster than dogs.",
  "A litter of piglets is called a farrow.",
  "A piglet weighs about 3 pounds at birth and will double in size a week later.",
  "Pigs have no sweat glands and roll around in the mud to lower their body temperature.",
  "Pigs run at a speed of 11.5 mph or almost 20 km/h."

];

var lionFacts = [
  "Lions are the second largest big cat species in the world, behind tigers.",
  "The average male lion weighs around 180 kg (400 lb) while the average female lion weighs around 130 kg (290 lb)",
  "The heaviest lion on record weighed an amazing 375 kg (826 lbs)",
  "Lions can reach speeds of up to 81 kph (50 mph) but only in short bursts because of a lack of stamina",
  "The roar of a lion can be heard from 8 kilometers (5.0 miles) away",
  "Most lions found in the wild live in southern and eastern parts of Africa",
  "Lions can leap as far as 36 feet.",
  "Lions eat about 20 pounds of meat per day.",
  "Only about 1 in 8 male lions survive to adulthood.",
  "The darker a male lion’s mane, the older he usually is.",
  "A Turkish proverb states: A lion sleeps in the heart of every brave man.",
  "Lions can open their jaws up to 1 foot, larger than a human head.",
  "The African lion’s loose-skin belly allows it to be kicked by prey with little chance of injury.",
  "A lioness and male jaguar hybrid is known as a jaglion.",
  "A lion’s pupil is three times as big as a human’s.",
  "Lions can be several different colors, including tan, brown, yellow, and red.",
  "A lion pride’s territory can be up to 100 square miles.",
  "Lions can sleep up to 22 hours a day."

];

var hippoFacts = [
  "The name hippopotamus means river horse and is often shortened to hippo",
  "The hippopotamus is generally considered the third largest land mammal (after the White rhinoceros and elephant)",
  "Hippopotamuses spend a large amount of time in water such as rivers, lakes and swamps",
  "Resting in water helps keep a hippopotamuses temperature down",
  "Hippopotamuses give birth in the water"

];

var sheepFacts = [
  "There are over 1 billion sheep in the world",
  "China has the largest number of sheep in the world",
  "Adult female sheep are known as ewes",
  "Adult male sheep are known as rams"

];
//V2//
var alligatorFacts = [
  "Aalligators are cold-blooded.",
  "Alligators can weigh over 450 kg 1000 lb.",
  "American alligators live in south-eastern areas of the United States such as Florida and Louisiana.",
  "Alligators eat a range of different animals such as fish, birds, turtles and even deer.",
  "Alligators have been living on Earth for millions of years and are sometimes described as living fossils."

];

var batsFacts = [
  "Bats are the only mammals capable of continued flight.",
  "There are over 1000 different bat species.",
  "Bats are nocturnal, active at night.",
  "Most bats feed on insects, while others eat fruit, fish or even blood.",
  "Bats can live for over 20 years."

];

var beesFacts = [
  "There are over 250 known species of bumble bees.",
  "A bee's buzz is not produced by the beating of its wings but by vibrating muscles.",
  "Bees have two pairs of wings, the larger fore wings and the smaller hind wings.",
  "Honey is made from the nectar and sweet deposits that bees collect from plants and trees. Honey is stored in honeycomb as a food source for the colony.",
  "There are 9 different families of bees and around 20,000 known species."

];

var baldEagleFacts = [
  "Bald Eagles are found in North America.",
  "The Great Seal of the United States features a bald eagle.",
  "The bald eagle is the national bird of the United States.",
  "Although their name suggests otherwise, bald eagles are not bald.",
  "Female bald eagles are larger than male bald eagles."

];

var parrotFacts = [
  "There are around 372 different parrot species.",
  "Most parrots live in tropical areas.",
  "Parrots have curved bills or beaks, strong legs and clawed feet.",
  "Parrots are often brightly colored.",
  "Parrots are believed to be one of the most intelligent bird species."

];

var penguinFacts = [
  "Penguins are flightless birds.",
  "While other birds have wings for flying, penguins have adapted flippers to help them swim in the water.",
  "Most penguins live in the Southern Hemisphere.",
  "The Galapagos Penguin is the only penguin specie that ventures north of the equator in the wild.",
  "Large penguin populations can be found in countries such as New Zealand, Australia, Chile, Argentina and South Africa.",
  "No penguins live at the North Pole.",
  "Penguins can drink sea water."

];

var toucanFacts = [
  "Toucan's have long narrow tongues up to 15 cm or 6 in long.",
  "Toucans are one of the nosier jungle birds.",
  "Toucans can live for up to 20 years.",
  "Since the 1960's, Toucan Sam, a cartoon mascot, has been used as the face of Kellogg's breakfast cereal Fruit Loops.",
  "Toucans live together in small-sized flocks, they make nests in tree hollows or holes that have often be created by their distant cousin the woodpecker.",
  "Toucans mainly eat fruit, but sometimes prey on insects and small lizards."

];

var sealFacts = [
  "There are around 33 species of seals.",
  "Seals are believed to have evolved from land based, bear or otter-like ancestors.",
  "Seals are semiaquatic marine mammals. They have four flippers, so they are in a category of animals known as pinnipedia which means fin-footed.",
  "Because they can spend months at sea, seals can sleep underwater.",
  "Some seal species can hold their breath for nearly two hours underwater by slowing their heart beat and conserving oxygen."

];

var seaLionFacts = [
  "The average life span of a sea lion is about 20 years.",
  "Pups or baby sea lions weigh about 13-20 pounds and are 2.5 feet long when they are born.",
  "Sea lions can swim at burst speeds up to 25 miles per hour, but most of the time they swim around 11 miles per hour.",
  "Sea lions have about 38 teeth, which they use to catch their food, They don't use them to chew their food though, they swallow it whole.",
  "Females can weigh between 200 and 400 pounds and can be up to 6.5 feet long.",
  "Male sea lions tend to be larger than females, weighing about 600 to 800 pounds and can be up to 8 feet long."

];

var whaleFacts = [
  "To breathe, whales have a blowhole in the top of their heads. When they reach the surface, they take air in through this blowhole.",
  "Whales can swim as fast as 30 miles per hour.",
  "Some Whales can stay underwater for as long as 90 minutes.",
  "The Blue whale is the largest animal in the world.",
  "Some baleen whales sing, Particularly the blue whales and the humpback whales are well known for singing."

];

const handlers = {
    'LaunchRequest': function () {
        this.emit('randomAnimalsIntent');
    },
    'randomAnimalsIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var animalsArr = animals;
        var animalsIndex = Math.floor(Math.random() * animals.length);
        var randomAnimals = animalsArr[animalsIndex];
        var factsArr = facts;
        var factsIndex = Math.floor(Math.random() * facts.length);
        var randomFacts = factsArr[factsIndex];
        var speechOutput = randomPulls + randomAnimals + "Would you like to try again?";
        var repromptSpeech = speechOutput;
        var titleCard = "Here's your fun animal fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/cardS.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/cardL.png'
        };
        this.emit(':askWithCard', speechOutput, repromptSpeech, titleCard, randomFacts, imageObj);
    },
    'allIntent': function () {
        var soundsArr = manySound;
        var manySoundIndex = Math.floor(Math.random() * manySound.length);
        var randomSounds = soundsArr[manySoundIndex];
        var factsArr = facts;
        var factsIndex = Math.floor(Math.random() * facts.length);
        var randomFacts = factsArr[factsIndex];
        var speechAll = randomSounds + "Would you like to try again?";
        var repromptAll = speechAll;
        var titleCard = "Here's your fun animal fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/cardS.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/cardL.png'
        };
        this.emit(':askWithCard', speechAll, repromptAll, titleCard, randomFacts, imageObj);
    },
    'goatIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var goatFactsArr = goatFacts;
        var goatFactsIndex = Math.floor(Math.random() * goatFacts.length);
        var randomGoatFacts = goatFactsArr[goatFactsIndex];
        var speechGoat = randomPulls + "The goat says" + "<audio src='https://s3.amazonaws.com/seeandsay/goat.mp3' />" + "Would you like to try again?";
        var repromptGoat = speechGoat;
        var titleCard = "Here's your fun goat fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/goat.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/goatb.png'
        };
        this.emit(':askWithCard', speechGoat, repromptGoat, titleCard, randomGoatFacts, imageObj);
    },
    'cowIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var cowFactsArr = cowFacts;
        var cowFactsIndex = Math.floor(Math.random() * cowFacts.length);
        var randomCowFacts = cowFactsArr[cowFactsIndex];
        var speechCow = randomPulls + "The cow says" + "<audio src='https://s3.amazonaws.com/seeandsay/cowmoo.mp3' />" + "Would you like to try again?";
        var repromptCow = speechCow;
        var titleCard = "Here's your fun cow fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/cow.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/cowb.png'
        };
        this.emit(':askWithCard', speechCow, repromptCow, titleCard, randomCowFacts, imageObj);
    },
    'bearIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var bearFactsArr = bearFacts;
        var bearFactsIndex = Math.floor(Math.random() * bearFacts.length);
        var randomBearFacts = bearFactsArr[bearFactsIndex];
        var speechBear = randomPulls + "The bear says" + "<audio src='https://s3.amazonaws.com/seeandsay/bear.mp3' />" + "Would you like to try again?";
        var repromptBear = speechBear;
        var titleCard = "Here's your fun bear fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/bear.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/bearb.png'
        };
        this.emit(':askWithCard', speechBear, repromptBear, titleCard, randomBearFacts, imageObj);
    },
    'catIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var catFactsArr = catFacts;
        var catFactsIndex = Math.floor(Math.random() * catFacts.length);
        var randomCatFacts = catFactsArr[catFactsIndex];
        var speechCat = randomPulls + "The cat says" + "<audio src='https://s3.amazonaws.com/seeandsay/cat.mp3' />" + "Would you like to try again?";
        var repromptCat = speechCat;
        var titleCard = "Here's your fun cat fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/cat.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/catb.png'
        };
        this.emit(':askWithCard', speechCat, repromptCat, titleCard, randomCatFacts, imageObj);
    },
    'dogIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var dogFactsArr = dogFacts;
        var dogFactsIndex = Math.floor(Math.random() * dogFacts.length);
        var randomDogFacts = dogFactsArr[dogFactsIndex];
        var speechDog = randomPulls + "The dog says" + "<audio src='https://s3.amazonaws.com/seeandsay/dog.mp3' />" + "Would you like to try again?";
        var repromptDog = speechDog;
        var titleCard = "Here's your fun dog fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/dog.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/dogb.png'
        };
        this.emit(':askWithCard', speechDog, repromptDog, titleCard, randomDogFacts, imageObj);
    },
    'donkeyIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var donkeyFactsArr = donkeyFacts;
        var donkeyFactsIndex = Math.floor(Math.random() * donkeyFacts.length);
        var randomDonkeyFacts = donkeyFactsArr[donkeyFactsIndex];
        var speechDonkey = randomPulls + "The donkey says" + "<audio src='https://s3.amazonaws.com/seeandsay/donkey.mp3' />" + "Would you like to try again?";
        var repromptDonkey = speechDonkey;
        var titleCard = "Here's your fun donkey fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/donkey.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/donkeyb.png'
        };
        this.emit(':askWithCard', speechDonkey, repromptDonkey, titleCard, randomDonkeyFacts, imageObj);
    },
    'duckIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var duckFactsArr = duckFacts;
        var duckFactsIndex = Math.floor(Math.random() * duckFacts.length);
        var randomDuckFacts = duckFactsArr[duckFactsIndex];
        var speechDuck = randomPulls + "The duck says" + "<audio src='https://s3.amazonaws.com/seeandsay/duck.mp3' />" + "Would you like to try again?";
        var repromptDuck = speechDuck;
        var titleCard = "Here's your fun duck fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/duck.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/duckb.png'
        };
        this.emit(':askWithCard', speechDuck, repromptDuck, titleCard, randomDuckFacts, imageObj);
    },
    'frogIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var frogFactsArr = frogFacts;
        var frogFactsIndex = Math.floor(Math.random() * frogFacts.length);
        var randomfrogFacts = frogFactsArr[frogFactsIndex];
        var speechFrog = randomPulls + "The frog says" + "<audio src='https://s3.amazonaws.com/seeandsay/frog.mp3' />" + "Would you like to try again?";
        var repromptFrog = speechFrog;
        var titleCard = "Here's your fun frog fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/frog.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/frogb.png'
        };
        this.emit(':askWithCard', speechFrog, repromptFrog, titleCard, randomfrogFacts, imageObj);
    },
    'foxIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var foxFactsArr = foxFacts;
        var foxFactsIndex = Math.floor(Math.random() * foxFacts.length);
        var randomfoxFacts = foxFactsArr[foxFactsIndex];
        var speechFox = randomPulls + "The fox says" + "<audio src='https://s3.amazonaws.com/seeandsay/fox.mp3' />" + "Would you like to try again?";
        var repromptFox = speechFox;
        var titleCard = "Here's your fun fox fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/fox.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/foxb.png'
        };
        this.emit(':askWithCard', speechFox, repromptFox, titleCard, randomfoxFacts, imageObj);
    },
    'elephantIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var elephantFactsArr = elephantFacts;
        var elephantFactsIndex = Math.floor(Math.random() * elephantFacts.length);
        var randomelephantFacts = elephantFactsArr[elephantFactsIndex];
        var speechElephant = randomPulls + "The elephant says" + "<audio src='https://s3.amazonaws.com/seeandsay/elephant.mp3' />" + "Would you like to try again?";
        var repromptElephant = speechElephant;
        var titleCard = "Here's your fun elephant fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/elephant.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/elephantb.png'
        };
        this.emit(':askWithCard', speechElephant, repromptElephant, titleCard, randomelephantFacts, imageObj);
    },
    'hippoIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var hippoFactsArr = hippoFacts;
        var hippoFactsIndex = Math.floor(Math.random() * hippoFacts.length);
        var randomHippoFacts = hippoFactsArr[hippoFactsIndex];
        var speechHippo = randomPulls + "The Hippopotamuses says" + "<audio src='https://s3.amazonaws.com/seeandsay/hippo.mp3' />" + "Would you like to try again?";
        var repromptHippo = speechHippo;
        var titleCard = "Here's your fun hippopotamuses fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/hippo.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/hippob.png'
        };
        this.emit(':askWithCard', speechHippo, repromptHippo, titleCard, randomHippoFacts, imageObj);
    },
    'pigIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var pigFactsArr = pigFacts;
        var pigFactsIndex = Math.floor(Math.random() * pigFacts.length);
        var randomPigFacts = pigFactsArr[pigFactsIndex];
        var speechPig = randomPulls + "The pig says" + "<audio src='https://s3.amazonaws.com/seeandsay/pig.mp3' />" + "Would you like to try again?";
        var repromptPig = speechPig;
        var titleCard = "Here's your fun pig fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/pig.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/pigb.png'
        };
        this.emit(':askWithCard', speechPig, repromptPig, titleCard, randomPigFacts, imageObj);
    },
    'monkeyIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var monkeyFactsArr = monkeyFacts;
        var monkeyFactsIndex = Math.floor(Math.random() * monkeyFacts.length);
        var randomMonkeyFacts = monkeyFactsArr[monkeyFactsIndex];
        var speechMonkey = randomPulls + "The monkey says" + "<audio src='https://s3.amazonaws.com/seeandsay/monkey.mp3' />" + "Would you like to try again?";
        var repromptMonkey = speechMonkey;
        var titleCard = "Here's your fun monkey fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/monkey.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/monkeyb.png'
        };
        this.emit(':askWithCard', speechMonkey, repromptMonkey, titleCard, randomMonkeyFacts, imageObj);
    },
    'lionIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var lionFactsArr = lionFacts;
        var lionFactsIndex = Math.floor(Math.random() * lionFacts.length);
        var randomLionFacts = lionFactsArr[lionFactsIndex];
        var speechLion = randomPulls + "The lion says" + "<audio src='https://s3.amazonaws.com/seeandsay/lion.mp3' />" + "Would you like to try again?";
        var repromptLion = speechLion;
        var titleCard = "Here's your fun lion fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/lion.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/lionb.png'
        };
        this.emit(':askWithCard', speechLion, repromptLion, titleCard, randomLionFacts, imageObj);
    },
    'lambIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var lambFactsArr = sheepFacts;
        var lambFactsIndex = Math.floor(Math.random() * sheepFacts.length);
        var randomLambFacts = lambFactsArr[lambFactsIndex];
        var speechLamb = randomPulls + "The lamb says" + "<audio src='https://s3.amazonaws.com/seeandsay/lamb.mp3' />" + "Would you like to try again?";
        var repromptLamb = speechLamb;
        var titleCard = "Here's your fun lamb fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/sheep.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/sheepb.png'
        };
        this.emit(':askWithCard', speechLamb, repromptLamb, titleCard, randomLambFacts, imageObj);
    },
    'horseIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var horseFactsArr = horseFacts;
        var horseFactsIndex = Math.floor(Math.random() * horseFacts.length);
        var randomHorseFacts = horseFactsArr[horseFactsIndex];
        var speechHorse = randomPulls + "The horse says" + "<audio src='https://s3.amazonaws.com/seeandsay/horse.mp3' />" + "Would you like to try again?";
        var repromptHorse = speechHorse;
        var titleCard = "Here's your fun horse fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/horse.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/horseb.png'
        };
        this.emit(':askWithCard', speechHorse, repromptHorse, titleCard, randomHorseFacts, imageObj);
    },
    'owlIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var owlFactsArr = owlFacts;
        var owlFactsIndex = Math.floor(Math.random() * owlFacts.length);
        var randomOwlFacts = owlFactsArr[owlFactsIndex];
        var speechOwl = randomPulls + "The owl says" + "<audio src='https://s3.amazonaws.com/seeandsay/owlhoot.mp3' />" + "Would you like to try again?";
        var repromptOwl = speechOwl;
        var titleCard = "Here's your fun owl fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/owl.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/owlb.png'
        };
        this.emit(':askWithCard', speechOwl, repromptOwl, titleCard, randomOwlFacts, imageObj);
    },
    'roosterIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var roosterFactsArr = sheepFacts;
        var roosterFactsIndex = Math.floor(Math.random() * sheepFacts.length);
        var randomRoosterFacts = roosterFactsArr[roosterFactsIndex];
        var speechRooster = randomPulls + "The rooster says" + "<audio src='https://s3.amazonaws.com/seeandsay/roosterSF.mp3' />" + "Would you like to try again?";
        var repromptRooster = speechRooster;
        var titleCard = "Here's your fun rooster fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/rooster.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/roosterb.png'
        };
        this.emit(':askWithCard', speechRooster, repromptRooster, titleCard, randomRoosterFacts, imageObj);
    },
    'chickenIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var chickenFactsArr = chickenFacts;
        var chickenFactsIndex = Math.floor(Math.random() * chickenFacts.length);
        var randomChickenFacts = chickenFactsArr[chickenFactsIndex];
        var speechChicken = randomPulls + "The chicken says" + "<audio src='https://s3.amazonaws.com/seeandsay/chickenClucking.mp3' />" + "Would you like to try again?";
        var repromptChicken = speechChicken;
        var titleCard = "Here's your fun chicken fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/rooster.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/roosterb.png'
        };
        this.emit(':askWithCard', speechChicken, repromptChicken, titleCard, randomChickenFacts, imageObj);
    },
    'sheepIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var sheepFactsArr = sheepFacts;
        var sheepFactsIndex = Math.floor(Math.random() * sheepFacts.length);
        var randomSheepFacts = sheepFactsArr[sheepFactsIndex];
        var speechSheep = randomPulls + "The sheep says" + "<audio src='https://s3.amazonaws.com/seeandsay/lamb.mp3' />" + "Would you like to try again?";
        var repromptSheep = speechSheep;
        var titleCard = "Here's your fun sheep fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/sheep.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/sheepb.png'
        };
        this.emit(':askWithCard', speechSheep, repromptSheep, titleCard, randomSheepFacts, imageObj);
    },
    //V2//
    'alligatorIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var alligatorFactsArr = alligatorFacts;
        var alligatorFactsIndex = Math.floor(Math.random() * alligatorFacts.length);
        var randomGatorFacts = alligatorFactsArr[alligatorFactsIndex];
        var speechGator = randomPulls + "The alligator says" + "<audio src='https://s3.amazonaws.com/seeandsay/aligator.mp3' />" + "Would you like to try again?";
        var repromptGator = speechGator;
        var titleCard = "Here's your fun alligator fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/alligators.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/alligatorb.png'
        };
        this.emit(':askWithCard', speechGator, repromptGator, titleCard, randomGatorFacts, imageObj);
    },
    'eagleIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var baldEagleFactsArr = baldEagleFacts;
        var baldEagleFactsIndex = Math.floor(Math.random() * baldEagleFacts.length);
        var randomBladFacts = baldEagleFactsArr[baldEagleFactsIndex];
        var speechEagle = randomPulls + "The eagle says" + "<audio src='https://s3.amazonaws.com/seeandsay/baldEagle.mp3' />" + "Would you like to try again?";
        var repromptEagle = speechEagle;
        var titleCard = "Here's your fun eagle fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/baldEagles.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/baldEaglel.png'
        };
        this.emit(':askWithCard', speechEagle, repromptEagle, titleCard, randomBladFacts, imageObj);
    },
    'batsIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var batsFactsArr = batsFacts;
        var batsFactsIndex = Math.floor(Math.random() * batsFacts.length);
        var randomBatFacts = batsFactsArr[batsFactsIndex];
        var speechBat = randomPulls + "The bat says" + "<audio src='https://s3.amazonaws.com/seeandsay/bats.mp3' />" + "Would you like to try again?";
        var repromptBat = speechBat;
        var titleCard = "Here's your fun bat fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/bats.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/batl.png'
        };
        this.emit(':askWithCard', speechBat, repromptBat, titleCard, randomBatFacts, imageObj);
    },
    'beeIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var beesFactsArr = beesFacts;
        var beesFactsIndex = Math.floor(Math.random() * beesFacts.length);
        var randomBeeFacts = beesFactsArr[beesFactsIndex];
        var speechBee = randomPulls + "The bumble bee says" + "<audio src='https://s3.amazonaws.com/seeandsay/bee.mp3' />" + "Would you like to try again?";
        var repromptBee = speechBee;
        var titleCard = "Here's your fun bee fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/bees.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/beel.png'
        };
        this.emit(':askWithCard', speechBee, repromptBee, titleCard, randomBeeFacts, imageObj);
    },
    'parrotIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var parrotFactsArr = parrotFacts;
        var parrotFactsIndex = Math.floor(Math.random() * parrotFacts.length);
        var randomParrotFacts = parrotFactsArr[parrotFactsIndex];
        var speechParrot = randomPulls + "The parrot says" + "<audio src='https://s3.amazonaws.com/seeandsay/parrot.mp3' />" + "Would you like to try again?";
        var repromptParrot = speechParrot;
        var titleCard = "Here's your fun parrot fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/parrots.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/parrotl.png'
        };
        this.emit(':askWithCard', speechParrot, repromptParrot, titleCard, randomParrotFacts, imageObj);
    },
    'penguinIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var penguinFactsArr = penguinFacts;
        var penguinFactsIndex = Math.floor(Math.random() * penguinFacts.length);
        var randomPenguinFacts = penguinFactsArr[penguinFactsIndex];
        var speechPenguin = randomPulls + "The penguin says" + "<audio src='https://s3.amazonaws.com/seeandsay/penguin.mp3' />" + "Would you like to try again?";
        var repromptPenguin = speechPenguin;
        var titleCard = "Here's your fun penguin fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/penguins.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/penguinl.png'
        };
        this.emit(':askWithCard', speechPenguin, repromptPenguin, titleCard, randomPenguinFacts, imageObj);
    },
    'toucanIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var toucanFactsArr = toucanFacts;
        var toucanFactsIndex = Math.floor(Math.random() * toucanFacts.length);
        var randomToucanFacts = toucanFactsArr[toucanFactsIndex];
        var speechToucan = randomPulls + "The toucan says" + "<audio src='https://s3.amazonaws.com/seeandsay/toucan.mp3' />" + "Would you like to try again?";
        var repromptToucan = speechToucan;
        var titleCard = "Here's your fun toucan fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/toucans.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/toucanb.png'
        };
        this.emit(':askWithCard', speechToucan, repromptToucan, titleCard, randomToucanFacts, imageObj);
    },
    'sealIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var sealFactsArr = sealFacts;
        var sealFactsIndex = Math.floor(Math.random() * sealFacts.length);
        var randomSealFacts = sealFactsArr[sealFactsIndex];
        var speechSeal = randomPulls + "The seal says" + "<audio src='https://s3.amazonaws.com/seeandsay/seal.mp3' />" + "Would you like to try again?";
        var repromptSeal = speechSeal;
        var titleCard = "Here's your fun seal fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/seals.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/sealb.png'
        };
        this.emit(':askWithCard', speechSeal, repromptSeal, titleCard, randomSealFacts, imageObj);
    },
    'seaLionIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var seaLionFactsArr = seaLionFacts;
        var seaLionFactsIndex = Math.floor(Math.random() * seaLionFacts.length);
        var randomSealionFacts = seaLionFactsArr[seaLionFactsIndex];
        var speechSealion = randomPulls + "The sea lion says" + "<audio src='https://s3.amazonaws.com/seeandsay/sealion.mp3' />" + "Would you like to try again?";
        var repromptSealion = speechSealion;
        var titleCard = "Here's your fun sea lion fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/seaLions.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/seaLionb.png'
        };
        this.emit(':askWithCard', speechSealion, repromptSealion, titleCard, randomSealionFacts, imageObj);
    },
    'whaleIntent': function () {
        var pullsArr = pulls;
        var pullsIndex = Math.floor(Math.random() * pulls.length);
        var randomPulls = pullsArr[pullsIndex];
        var whaleFactsArr = whaleFacts;
        var whaleFactsIndex = Math.floor(Math.random() * whaleFacts.length);
        var randomWhaleFacts = whaleFactsArr[whaleFactsIndex];
        var speechWhale = randomPulls + "The whale says" + "<audio src='https://s3.amazonaws.com/seeandsay/whale.mp3' />" + "Would you like to try again?";
        var repromptWhale = speechWhale;
        var titleCard = "Here's your fun whale fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/whales.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/whalel.png'
        };
        this.emit(':askWithCard', speechWhale, repromptWhale, titleCard, randomWhaleFacts, imageObj);
    },
    'factIntent': function () {
        var animalFactsArr = facts;
        var animalFactsIndex = Math.floor(Math.random() * facts.length);
        var randomAnimalFacts = animalFactsArr[animalFactsIndex];
        var speechFact = randomAnimalFacts + "Would you like to try again?";
        var repromptFact = speechFact;
        var titleCard = "Here's your fun animal fact!";

        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/cardS.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/cardL.png'
        };
        this.emit(':askWithCard', speechFact, repromptFact, titleCard, randomAnimalFacts, imageObj);
    },
    'AMAZON.HelpIntent': function () {
      var speechOutput = HELP_MESSAGE;
       var repromptSpeech = HELP_REPROMPT;
       var examplesPhrases =  "Spin the wheel. \n Pull the handle. \n Spin it. \n Pull it. \n You can also ask for an animal by there name. \n Alligator, Bats, Bald Eagle, Bear, Bees, Cat, \n Cow, Dog, Donkey, Duck, Elephant, Fox \n Frog, Goat, Hippopotamuses, Horse, Lion, Monkey,  \n Owl, Parrot, Penguin, Pig, Rooster \n Seal, Sea Lion, Sheep, Toucan, Whale  ";
       var imageObj = {
       smallImageUrl: 'https://s3.amazonaws.com/seeandsay/cardS.png',
       largeImageUrl: 'https://s3.amazonaws.com/seeandsay/cardL.png'
       };
       this.emit(':askWithCard', speechOutput, repromptSpeech, HELP_PROMPT, examplesPhrases, imageObj);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
     'Unhandled': function (){
       var speechOutput = HELP_MESSAGE;
        var repromptSpeech = HELP_REPROMPT;
        var examplesPhrases =  "Spin the wheel. \n Pull the handle. \n Spin it. \n Pull it. \n You can also ask for an animal by there name. \n Alligator, Bats, Bald Eagle, Bear, Bees, Cat, \n Cow, Dog, Donkey, Duck, Elephant, Fox \n Frog, Goat, Hippopotamuses, Horse, Lion, Monkey,  \n Owl, Parrot, Penguin, Pig, Rooster \n Seal, Sea Lion, Sheep, Toucan, Whale  ";
        var imageObj = {
        smallImageUrl: 'https://s3.amazonaws.com/seeandsay/cardS.png',
        largeImageUrl: 'https://s3.amazonaws.com/seeandsay/cardL.png'
        };
        this.emit(':askWithCard', speechOutput, repromptSpeech, HELP_PROMPT, examplesPhrases, imageObj);
  }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
