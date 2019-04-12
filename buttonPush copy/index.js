
const Alexa = require('ask-sdk-core');
const cookbook = require('alexa-cookbook.js');
const nodemailer = require('nodemailer');

////////////////////////////////////////////////////////

const SKILL_NAME = 'KindHealth';
const HELP_MESSAGE = 'You can say main menu, I lost my card or, you can ask a health care related question... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const FALLBACK_MESSAGE = 'You can say main menu, I lost my card or, you can ask a health care related question... What can I help you with?'; 
const FALLBACK_REPROMPT = 'What can I help you with?';
const SMALLIMAGE = 'https://s3.amazonaws.com/kindhealth/IconSC.png';
const LARGEIMAGE = 'https://s3.amazonaws.com/kindhealth/IconLC.png';



const openings = [
    'Hello! Welcome to Kind Health! If you have a question about health care, like when will I get my insurance card, just ask it and if you lost your insurance card, just say I lost my card. What can I help you with?',
    'Welcome to Kind Health! You can ask for a replacement insurance card, ask to speak with customer service, or ask a related health care question like what is a P P O Plan? Which would you like?',
    'Hello! Welcome to Kind Health! You can ask questions about Health Care like, what is a H M O? If you lost your insurance Card, just say I lost my card. What can I help you with?',
    'Welcome to Kind Health your friendly choice in health care! You can report a lost insurance card, ask to customer service contact information, or ask a related health care question like when is open enrollment? Which would you like?',
    'Hello! Welcome to Kind Health! If you have a question about Health Care just ask it and if you lost your insurance Card, just say new card. What can I help you with?',
    'Welcome to Kind Health! You can request a new insurance card, ask to speak with customer service, or ask a related health care question like, what is gap insurance? Which would you like?',
    'Hello! We are Kind Health! If you have a question about Health Care Insurance, like what is a coinsurance, just ask it and if you lost your insurance Card, just say I need a replacement card. What can I help you with?',
    'Welcome to Kind Health your friendly choice in health care! You can report a lost insurance card, ask for customer service contact information, or ask a related health care question like what is a deductible? Which would you like?',
    'Hello! Welcome to Kind Health! If you have a question about Health Care, like what is health insurance, just ask it and if you lost your insurance Card, just say I lost my card. What can I help you with?',
    'Welcome to Kind Health your advocate in health care! You can report a lost insurance card, ask for customer service, or ask a related health care question like can you help with Corba? Which would you like?',
    'Hello! Welcome to Kind Health! You can ask a question about Health Care like, what is a copayment, just ask it and if you lost your insurance Card, just say I need a new card. What can I help you with?',
    'Welcome to Kind Health your advocate in health care! You can ask a related health care question like what is Health Share, help me contact customer service, or tell me about a gate keeper? Which would you like?',
    'Welcome to Kind Health! You can ask a related health care question like how do I find doctors in my network, how do I add family member to my family plan, or what is a life event? Which would you like?',
    'Hello! Welcome to Kind Health! If you have a question about health care, like tell me about the affiliate referral program and if you lost your insurance Card, just say I lost my card. What can I help you with?',
    'Hello! Welcome to Kind Health! If you have a question about health care, like what is a indemnity plan and if you lost your insurance Card, just say I lost my card. What can I help you with?',
    'Welcome to Kind Health! You can ask for a replacement insurance card, ask to speak with customer service, or ask a related health care question like what is co-insurance? Which would you like?',
    'Hello! Welcome to Kind Health! You can ask questions about health care like, what is a copayment? If you lost your insurance Card, just say I lost my card. What can I help you with?',
    'Welcome to Kind Health your friendly choice in health care! You can report a lost insurance card, ask to customer service contact information, or ask a related health care question like what is point of service? Which would you like?',
    'Hello! Welcome to Kind Health! If you have a question about health care just ask it and if you lost your insurance Card, just say new card. What can I help you with?',
    'Welcome to Kind Health! You can request a new insurance card, ask to speak with customer service, or ask a related health care question like, what is medicare? Which would you like?',
    'Hello! We are Kind Health! If you have a question about health care insurance, like what is short term health insurance, just ask it and if you lost your insurance Card, just say I need a replacement card. What can I help you with?',
    'Welcome to Kind Health your friendly choice in health care! You can report a lost insurance card, ask for customer service contact information, or ask a related health care question like what is an effective date? Which would you like?',
    'Hello! Welcome to Kind Health! If you have a question about health care like, do you offer dental insurance, just ask it and if you lost your insurance Card, just say I lost my card. What can I help you with?',
    'Welcome to Kind Health your advocate in health care! You can report a lost insurance card, ask for customer service, or ask a related health care question like what is a tax subsidy? Which would you like?',
    'Hello! Welcome to Kind Health! You can ask a question about health care like, what is an out of pocket cost, just ask it and if you lost your insurance Card, just say I need a new card. What can I help you with?',
    'Welcome to Kind Health your advocate in health care! You can ask a related health care question like what is Health Share, help me contact customer service, or tell me about a gate keeper? Which would you like?',
    'Welcome to Kind Health! You can ask a related health care question like what is a pre-existing condition, what is gap insurance, and what is group insurance? Which would you like?',
];

const helpings = [
  'You can say main menu, I lost my card, I need to speak with someone, or you can ask a health care related question... What can I help you with?',
  'You can say main menu, I lost my card, you can ask a health care related question... What can I help you with?',
  'You have a question about health care, like when will I get my insurance card, just ask it and if you lost your insurance Card, just say I lost my card. What can I help you with?',
  'You can say main menu, You can ask for a replacement insurance card, ask to speak with customer service, or ask a related health care question like what is a P P O Plan? Which would you like?',
  'You can ask questions about health care like, what is a H M O? If you lost your insurance Card, just say I lost my card. What can I help you with?',
  'You can report a lost insurance card, ask to customer service contact information, or ask a related health care question like when is open enrollment? Which would you like?',
  'You can say main menu, If you have a question about Health Care just ask it and if you lost your insurance Card, just say new card. What can I help you with?',
  'You can request a new insurance card, ask to speak with customer service, or ask a related health care question like, what is gap insurance? Which would you like?',
  'If you have a question about health care insurance, like what is a coinsurance, just ask it and if you lost your insurance Card, just say I need a replacement card. What can I help you with?',
  'You can report a lost insurance card, ask for customer service contact information, or ask a related health care question like what is a deductible? Which would you like?',
  'If you have a question about health care, like what is health insurance, just ask it and if you lost your insurance Card, just say I lost my card. What can I help you with?',
  'You can say main menu, You can report a lost insurance card, ask for customer service, or ask a related health care question like, what is a health share? Which would you like?',
  'You ask a question about health care like, what is a copayment, just ask it and if you lost your insurance Card, just say I need a new card. What can I help you with?',
  'You can ask a related health care question like what is Health Share, help me contact customer service, or tell me about a gate keeper? Which would you like?',
  'You can say main menu, You can ask a related health care question like how do I find doctors in my network, how do I add a family member to my family plan, or what is a life event? Which would you like?',
  ]; 
  
const webStats = [
  'Remember, 80% of people pick the wrong health insurance.',
  'We are an Official partner of HealthCare.gov with an overall rating 4.8 out of 5',
  'It is possible to shop 100’s of plans (more options than the Exchange) without having to give us all your personal info.',
  'We are your free advocate we can book appointments, dispute bills and more. Give us a click or call, at Kind Health',
  'Each month we donate $1000 to a person who could use a little help with their medical bills.',
  'We work with all major carriers such as aetna, vista360, oscar, molina, blue cross blue shield, cigna, Humana, kaiser and many more',
  'Never overpay for health insurance again( Our customers save an average of $4,000 per year)',
  'Less time comparing health insurance. More time doing literally anything else.',
  'Find the best plan that’s affordable and covers exactly what you need, all in under 5 minutes with Kind Health.'
  ];

const closings = [
  'Remember, 80% of people pick the wrong health insurance. We can help at Kind Health and please be sure to leave us a review.',
  'I hope we have answered all of your questions today, if not please check out our website at kind health.co',
  'I hope we have answered all of your questions today, if not please give us a call at 1 (888) 871-3864',
  'Thanks for visiting us at Kind Health, have a great day!',
  'We are an Official partner of HealthCare.gov with an overall rating 4.8 out of 5, Thanks for visiting us at Kind Health!',
  'Thanks for visiting us at Kind Health, please be sure to leave us a review.',
  'It is possible to shop 100’s of plans (more options than the Exchange) without having to give us all your personal info. Thanks for visiting us at Kind Health',
  'We are your free advocate we can book appointments, dispute bills and more. Give us a click or call, at Kind Health',
  'Thanks for visiting us at Kind Health',
  'Each month we donate $1000 to a person who could use a little help with their medical bills. Have a great day from all of us at Kind Health',
  'We work with all major carriers such as aetna, vista360, oscar, molina, blue cross blue shield, cigna, Humana, kaiser and many more, Give us a call so we can work with you!',
  'Never overpay for health insurance again(Our customers save an average of $4,000 per year). Find us on the web or call Kind Health today',
  'Less time comparing health insurance. More time doing literally anything else. Find us on the web or call Kind Health today',
  'Find the best plan that’s affordable and covers exactly what you need, all in under 5 minutes with Kind Health just a click or call away',
  ];
  
  const lostCard = [
  'We are sorry to hear that you misplaced your insurance card, I sent our contact information to your Alexa App. I can also dial phone numbers, once our skill is closed, just say Alexa, call 1 (888) 871-3864',
  'I am sorry you lost your insurance card, I sent our contact information to your Alexa app and our phone number is 1, 8, 8, 8, 8, 7, 1, 3, 8, 6, 4. Give us a call and we can get you a new card!',
  'Sorry about your insurance card. I sent our contact information to your Alexa app. If you want to talk to someone now, just say Alexa, I want a call back at (say your phone number) and a representative from KindHealth will be in contact shortly',
  'Sorry about your insurance card we can get you a new one quickly. I sent our contact information to your Alexa app. If you want to talk to someone now, just say Alexa, give me a call back at (say your phone number) and a representative from KindHealth will be in contact shortly',
  'I am sorry you lost your insurance card, I sent our contact information to your Alexa app. If you want to talk to someone now, just say Alexa, give me a call back at (say your phone number) and a representative from KindHealth will be in contact shortly, we can get you a new card!',
  'Sorry about your insurance card. I sent our contact information to your Alexa app. If you want to talk to someone now, just say Alexa, I want a call back at (say your phone number) and a representative from KindHealth will be in contact shortly',
  'Sorry about your insurance card we can get you a new one quickly. I sent our contact information to your Alexa app. If you want to talk to someone now, just say Alexa, give me a call back at (say your phone number) and a representative from KindHealth will be in contact shortly',
    ];
    
  const customerService = [
  'Okay, I sent our contact information to your Alexa App. I can also dial phone numbers, once our skill is closed, just say Alexa, call 1 (888) 871-3864',
  'Alright, I sent our contact information to your Alexa app. If you want to talk to someone now, just say Alexa, call me back at (say your phone number) and a representative from KindHealth will be in contact shortly',
  'Sure, let\'s get you over to our customer service department. If you want to talk to someone now, just say Alexa, have them call me at (say your phone number) and a representative from KindHealth will be in contact shortly',
  'Okay, let\'s get you over to someone that can help! I sent our contact information to the Alexa app. If you want to talk to someone now, just say Alexa, give me a call back at (say your phone number) and a representative from KindHealth will be in contact shortly',
  'Okay, let\'s get you over to someone that can help! If you want to talk to someone now, just say Alexa, give me a call back at (say your phone number) and a representative from KindHealth will be in contact shortly',
  'Sure, let\'s get you over to our customer service department. If you want to talk to someone now, just say Alexa, call me at (say your phone number) and a representative from KindHealth will be in contact shortly',
  'Alright, I sent our contact information to your Alexa app. If you want to talk to someone now, just say Alexa, have them call me back at (say your phone number) and a representative from KindHealth will be in contact shortly',
    ];

  const healthCareStats = {
    "information" : [
      {
          "subject": "health insurance",
          "question": "What does Health Insurance mean?",
          "answer": "Health insurance is a type of insurance coverage that covers the cost of an insured individual's medical and surgical expenses. \n Depending on the type of health insurance coverage, either the insured pays costs out of pocket and is then reimbursed, \n or the insurer makes payments directly to the provider.", 
      },
      {
          "subject": "deductible",
          "question": "What does Deductible mean?",
          "answer": "A fixed dollar amount during the benefit period - usually a year - that an insured person pays before the insurer starts to make payments for covered medical services. \n Plans may have both per individual and family deductibles.", 
      },
      {
          "subject": "coinsurance, co insurance, co-insurance",
          "question": "What is Coinsurance?",
          "answer": "A form of medical cost sharing in a health insurance plan that requires an insured person to \n pay a stated percentage of medical expenses after the deductible amount, if any, was paid.", 
      },
      {
          "subject": "copayment, copay, co-pay, co pay, co-payment",
          "question": "What is copayment?",
          "answer": "A form of medical cost sharing in a health insurance plan that requires an insured person to pay a fixed dollar amount when a medical service is received. \n The insurer is responsible for the rest of the reimbursement.", 
      },
      {
          "subject": "copayment and coinsurance, coinsurance and copayment, co pay and co insurance, co insurance and co pay",
          "question": "What’s the difference between a copayment and coinsurance?",
          "answer": "A copayment is a fixed amount you pay toward each medical service, such as $25 for a checkup. Coinsurance is a fixed percentage, rather than a flat amount, that you pay toward each service.", 
      },
      {
          "subject": "gatekeeper, gate keeper",
          "question": "Who is a gatekeeper?",
          "answer": "Under some health insurance arrangements, a gatekeeper is responsible for the administration of the patient’s treatment; \n the gatekeeper coordinates and authorizes all medical services, laboratory studies, specialty referrals and hospitalizations.", 
      },
      {
          "subject": "indemnity plan",
          "question": "What is Indemnity plan?",
          "answer": "A type of medical plan that reimburses the patient and/or provider as expenses are incurred.", 
      },
      {
          "subject": "dental insurance, dental",
          "question": "Do you sell Dental insurance?",
          "answer": "Yes we do. You can get a free quote at getkindhealth.com", 
      },
      {
          "subject": "life insurance, life",
          "question": "Do you sell Life insurance?",
          "answer": "Yes we do. You can get a free quote at getkindhealth.com", 
      },
      {
          "subject": "cancer insurance, cancer",
          "question": "Do you sell Cancer insurance?",
          "answer": "Yes we do. You can get a free quote at getkindhealth.com", 
      },
      {
          "subject": "vision insurance, vision",
          "question": "Do you sell Vision insurance?",
          "answer": "Yes we do. You can get a free quote at getkindhealth.com", 
      },
      {
          "subject": "short term insurance",
          "question": "Do you sell short term insurance?",
          "answer": "Yes we do. You can get a free quote at getkindhealth.com", 
      },
      {
          "subject": "catastrophic plans, catastrophic",
          "question": "Do you sell Catastrophic plans?",
          "answer": "Yes we do. You can get a free quote at getkindhealth.com", 
      },
      {
          "subject": "health insurance, health",
          "question": "Do you sell Health insurance?",
          "answer": "Yes we do. You can get a free quote at getkindhealth.com", 
      },
      {
          "subject": "conventional indemnity plan",
          "question": "What is conventional indemnity plan?",
          "answer": "An indemnity that allows the participant the choice of any provider without effect on reimbursement. \n These plans reimburse the patient and/or provider as expenses are incurred.", 
      },
      {
         "subject": 'ppo plan, preferred provider organization plan, p p o plan',
          "question": "What is PPO plan?",
          "answer": "P.P.O is short for Preferred provider organization plan. \n An indemnity plan where coverage is provided to participants through a network of selected health care providers (such as hospitals and physicians). The enrollees may go outside the network, \n but would incur larger costs in the form of higher deductibles, higher coinsurance rates, or no discounted charges from the providers.", 
      },
      {   
          "subject": "epo, exclusive provider organization plan, exclusive provider organization ",
          "question": "What is EPO?",
          "answer": "E.P.O is short for Exclusive provider organization plan. \n A more restrictive type of preferred provider organization plan under which employees must use providers from the specified network of physicians and hospitals to receive coverage; \n there is no coverage for care received from a non-network provider except in an emergency situation", 
      },
      {
          "subject": "hmo, h m o, health maintenance organization",
          "question": "What is HMO?",
          "answer": "H.M.O is short for Health maintenance organization. \n An HMO gives you access to certain doctors and hospitals within its network. \n A network is made up of providers that have agreed to lower their rates for plan members and also meet quality standards.", 
      },
      {
          "subject": "pos, point of service plan, point of service, p o s",
          "question": "What is POS?",
          "answer": "P.O.S is short for Point-of-service plan. \n A POS plan is an HMO/PPO hybrid; sometimes referred to as an open-ended HMO when offered by an HMO. POS plans resemble HMOs for in-network services. \n Services received outside of the network are usually reimbursed in a manner similar to conventional indemnity plans\n (e.g., provider reimbursement based on a fee schedule or usual, customary and reasonable charges).", 
      },
      {
          "subject": "medicare",
          "question": "What is Medicare?",
          "answer": "Medicare plans are Health insurance for individuals who are 65 or older, or those under 65 who may qualify because of a disability or another special situation.", 
      },
      {
          "subject": "short term health insurance, short term, short term insurance",
          "question": "What is Short Term health insurance?",
          "answer": "Short Term medical insurance, also called Temporary health insurance or Term health insurance, can provide a temporary solution to help fill gaps in coverage. \nConsider Short Term if you’re... \nBetween jobs \nWaiting for other coverage to begin \nWaiting to be eligible for Medicare coverage \nWithout health insurance, outside of Open Enrollment ", 
      },
      {
          "subject": "short term health insurance available for families, short term health insurance for families, families, short term insurance for families",
          "question": "Is Short Term health insurance available for families?",
          "answer": "Yes, spouses and dependents can be covered under a Short Term insurance plan. However, because Short Term is medically underwritten, all family members will need to meet medical requirements of the plan.", 
      },
      {
          "subject": "open enrollment period, open enrollment, enrollment",
          "question": "What are the dates for the 2019 Open Enrollment Period?",
          "answer": "If you’ve shopped during the Open Enrollment Period (OEP) in previous years, you may have noticed that the time frame you have to enroll in a plan has been shortened. \nAlthough in past years the OEP dates have changed, the 2019 Open Enrollment Period is projected to occur during the same time frame as the year before.",
      },
      {
          "subject": "effective date, effective",
          "question": "Why does it say that the effective date is X ?",
          "answer": "As per FFM(federally facilitated marketplace) business rule, if an enrollment is completed before or on the 15th day of the month, the effective date of the policy should start from the upcoming month. \nIf the enrollment is completed after the 15th of the month, the policy should take effect from the month after the upcoming month.",
      },
      {
          "subject": "receive my id card, id card, insurance card",
          "question": "When will I receive my ID card?",
          "answer": "You will receive your ID card 7-10 business days from your policy start date.",
      },
      {
          "subject": "coverage that begins now, begins, begins now, coverage",
          "question": "Is there any coverage that can begin now?",
          "answer": "If it is after the 15th of the month then our site will default to a first of the following month instead of first of the upcoming month effective date.  However, your effective date will really depend on your qualifying event date and the date you enroll.  \nFor example, if you have coverage ending the end of this month and enroll by April 30, you can still get a May 1 effective date.  \nThe only type of coverage that can start sooner than May 1, though, would be a short-term medical plan.  \nThose can start as soon as the next day after you enroll if you qualify.  If you would like a short-term medical plan, please let me know.",
      },
      {
          "subject": "dental insurance, dental",
          "question": "I am looking for dental insurance.",
          "answer": "We don't have dental plan options displayed on our site, but we can definitely run manual quotes and e-mail you some dental plan options. Please give us a call.",
      },
      {
          "subject": "tax, tax subsidy, help pay",
          "question": "Can I get a tax subsidy to help pay for my Short Term health insurance?",
          "answer": "No. Short Term plans do not qualify for tax subsidies under the ACA.",
      },
      {
          "subject": "preexisting conditions, pre-existing conditions, preexisting condition, pre-existing condition",
          "question": "Does Short Term health insurance provide coverage for preexisting conditions?",
          "answer": "No. In most cases Short Term insurance plans do not cover preexisting conditions, which depending on your state’s definition would mean something you received diagnosis or treatment for within the last 2 to 5 years. \nIf you are in this situation, you may want to explore other options or see if you can extend your current insurance plan.",
      },
      {
          "subject": "moved to the u s, moved to the united states, documentation, purchase, outside of open enrollment, to u s",
          "question": "I recently moved to the US. What documentation is needed to allow me to purchase a policy outside of open enrollment?",
          "answer": "As long as you moved to the U.S. within the past 60 days, that is a qualifying event. \nHere are the two documents the Marketplace will accept for proving a move to the U.S. from another country. \nIf you moved from a foreign country, you must submit a document that confirms this information. \nDocuments you can submit: An Arrival/Departure Record (I-94/I-94A) (in a foreign passport or separately) that shows your date of entry into the U.S. A passport with an admission stamp showing your date of entry into the U.S.",
      },
      {
          "subject": "gap insurance, gap",
          "question": "Do you have gap insurance to cover the deductible?",
          "answer": "Yes, we do have deductible gap insurance. Please note the plans don't cover all deductible related expenses.  \nThey are designed to help with the major unexpected expenses that may arise and cause you to have to meet your deductible call at once; namely, hospitalization, an accident, or a critical illness diagnosis.",
      },
      {
          "subject": "someone else, someone",
          "question": "Can I use my health insurance for someone else?",
          "answer": "You should only use someone's else's medical insurance if you are a covered dependent on the plan.  Otherwise, it can be considered insurance fraud.",
      },
      {
          "subject": "tax penalty, need to pay",
          "question": "What kind of tax penalty will I need to pay if I stick with my short-term plan?",
          "answer": "First, know that you may qualify for an exemption from the tax penalty if you cannot afford major medical health insurance. \nUnder ACA rules, health insurance is considered “unaffordable” when the lowest-priced plan available in your zip code costs more than 8.05% of your household income (MAGI) in 2018 (see details below). \nNote that your household income must be above 400% of the Federal Poverty Level to qualify for this exemption. \nIf you don’t qualify for an exemption, and you don’t have major medical health insurance that meets the Obamacare coverage requirements for more than three months in a row, you may face a tax penalty of up to 2.5% of your taxable income, whichever is greater in 2018. The penalty goes away in 2019.",
      },
      {
          "subject": "switch, traditional",
          "question": "Can’t I just keep buying short-term coverage indefinitely? Why should I switch to a traditional individual or family plan?",
          "answer": "Most short-term plans limit your coverage to a maximum of 12 months at a time, or less. And most short-term health insurance companies will limit how many times you can repurchase coverage in a row. \nIt’s possible to be declined based on your medical history, so if you get sick and then need to re-apply for coverage under a new short-term plan, you may be out of luck. \nYou’ll also miss out on the richer benefits provided by major medical health insurance plans that meet the standards of the Affordable Care Act. \nDon’t treat short-term coverage like a long-term solution. It’s not.",
      },
      {
          "subject": "supplemental health insurance, supplemental health, supplemental, supplement",
          "question": "Do you offer supplemental health insurance?",
          "answer": "Open ended question. This is a question that requires a lot of follow up questions about what kind of supplemental",
      },
      {
          "subject": "cobra",
          "question": "Do you help with Cobra?",
          "answer": " We only deal with major medical, health share plans, short-term, and supplemental policies.",
      },
      {
          "subject": "group insurance, group, individual",
          "question": "Do you guys assist with Group insurance or only individual?",
          "answer": "We specialize in individual insurance in-house, but we have a resource called Connected Benefits who are experts in the area of group coverage.  \nLet me introduce you to Gabe over there via email so he can help you.  Please provide an e-mail address for the introduction.",
      },
      {
          "subject": "add a family member, family insurance plan, family member, relative",
          "question": "I was wondering if you could add a family member on a family insurance plan?",
          "answer": "Yes, you can add a family member on an insurance plan if they have a qualifying event and are a dependent.  \nFor example, if they lost other qualifying coverage within the past 60 days for reasons other than non-payment or rescission, then you can add them now.  Otherwise, you can add them during Open Enrollment (November 1 to December 15).  \nAlso, they would have to be either a spouse, domestic partner, child, or other legal dependent.  \nYou couldn't add a parent or adult sibling, for example.  The easiest way to add them is to contact the carrier that you have your insurance through.  \nYou can simply call the customer service phone number on your id card to let them know you want to add a family member.",
      },
      {
          "subject": "out of pocket cost, pocket costs, pocket cost",
          "question": "Is there some sort of plan that would cover that out of pocket cost?",
          "answer": "A gap policy will pay you a specific amount that you can use towards your deductible, out of pocket max, etc.  \nPlease find the plan details and prices attached.  Please note the plans don't cover all deductible related expenses.  \nThey are designed to help with the major unexpected expenses that may arise and cause you to have to meet your deductible call at once; namely, hospitalization, an accident, or a critical illness diagnosis.",
      },
      {
          "subject": "pre-existing condition, pre existing condition, condition",
          "question": "Does the private insurance accept pre-existing condition?",
          "answer": "Yes, private health insurance does cover pre-existing conditions as long as it's a major medical plan and not a health share or short-term medical.  \nAs long as you enroll within 60 days after you lost coverage through your job, you can enroll in a plan now.  \nOtherwise, you will have to wait until Open Enrollment (November 1 to December 15) to enroll in a plan.",
      },
      {
          "subject": "health share, share",
          "question": "What is Health Share?",
          "answer": "A health share is a faith-based alternative to major medical health insurance.  \nIt is less expensive than major medical coverage at full price, and you can enroll any time of year as long as you can pass through a few health underwriting questions.  \nBeing a member of a health share will exempt you from the tax penalty for not having insurance for the months that you have the health share.",
      },
      {
          "subject": "my doctor, my network, doctor, network",
          "question": "Where do I go to check whether my doctor is in my network?",
          "answer": "Our agents will look up the name of the doctor and send you the information. Once we have find a doctor",
      },
      {
          "subject": "life event, event",
          "question": "If I experience a 'life event' can our premium be adjusted?",
          "answer": "If you experience an income change, then your premium may be able to be  adjusted as long as you already enrolled in a Marketplace plan.  \nA life event will allow you to switch plans outside of Open Enrollment, which may also result in a change in your premium amount.",
      },
      {
          "subject": "insurance medicaid, medicaid",
          "question": "Is this insurance Medicaid?",
          "answer": "No, this is not Medicaid.  We have individual health insurance, both through the Marketplace and directly through available companies in certain areas.  \nWe also have health share plans. However, if you go through the Marketplace eligibility process, the results will tell you if you are Medicaid eligible according to federal guidelines.  \nJust keep in mind that Medicaid actually varies from state to state, so your state will determine whether you are actually eligible for Medicaid where you live or not.",
      },
      {
          "subject": "source credible, credible",
          "question": "Is this source credible?",
          "answer": "We are a licensed brokerage firm.  We are one of Healthcare.gov's enrollment partners.  We are also licensed to sell insurance in almost all 50 states.  \nHere is a link to our licenses in case you want to check us out: https://www.kindhealth.co/legal/ (You might have to scroll down until you see them).  If you have any other questions or if there is anything else we can help with, please let us know.",
      },
      {
          "subject": "ob-gyn, o b g y n",
          "question": "What can OB-GYN specialize in?",
          "answer": "An OB-GYN specializes in women's reproductive health.  \nThey typically handle annual well-woman exams, pap tests, and infertility services (although infertility services are usually not covered under individual health insurance).",
      },
      {
          "subject": "maternity, childbirth expenses, childbirth expense, childbirth, child birth",
          "question": "Looking for a supplementary insurance and/or short-term disability that will help with maternity and childbirth expenses. Do you have anything like this?",
          "answer": "We have deductible gap plans that can help with this.  \nMaternity will fall under inpatient benefit and will pay a certain amount per day until your max is met. \nYou max will depend on your deductible and the amounts it covers are at the very top of page one and the monthly premium is at the bottom of page one.",
      },
      {
          "subject": "how quickly, quickly can i be covered, quickly can i get covered", 
          "question": "How quickly can I get coverage under short term?",
          "answer": "The earliest a Short Term health insurance plan can take effect is the day after your application is received. You may also choose a later effective date based on your individual needs.",
      },
      {
          "subject": "affiliate referral program, referral program",
          "question": "What is the affiliate referral program?",
          "answer": "We have the highest paying affiliate program around. For every completed application, you get $50. \nYou’re busy, so we’re happy to ease your load and pay you in the process. \nPassing on referrals is quick and easy. Each referral takes less than a minute. \nTo learn more please give us a click or call.",
      },
      //////////////////V2 Questions////////////////
      {
          "subject": "buy health insurance",
          "question": "How do I buy health insurance?",
          "answer": "Just visit us at getkindhealth.com for a free quote. When you decide to buy, you can do so right there on the website. It’ll only take a couple of minutes and it’s free to use.",
      },
      {
          "subject": "buy vision insurance",
          "question": "How do I buy vision insurance?",
          "answer": "Just visit us at getkindhealth.com for a free quote. When you decide to buy, you can do so right there on the website. It’ll only take a couple of minutes and it’s free to use.",
      },
      {
          "subject": "buy dental insurance",
          "question": "How do I buy dental insurance?",
          "answer": "Just visit us at getkindhealth.com for a free quote. When you decide to buy, you can do so right there on the website. It’ll only take a couple of minutes and it’s free to use.",
      },
      {
          "subject": "buy cancer insurance",
          "question": "How do I buy cancer insurance?",
          "answer": "Just visit us at getkindhealth.com for a free quote. When you decide to buy, you can do so right there on the website. It’ll only take a couple of minutes and it’s free to use.",
      },
      {
          "subject": "buy short term health insurance",
          "question": "How do buy I short term health insurance?",
          "answer": "Just visit us at getkindhealth.com for a free quote. When you decide to buy, you can do so right there on the website. It’ll only take a couple of minutes and it’s free to use.",
      },
      {
          "subject": "buy life insurance",
          "question": "How do I buy Life insurance?",
          "answer": "Just visit us at getkindhealth.com for a free quote. When you decide to buy, you can do so right there on the website. It’ll only take a couple of minutes and it’s free to use.",
      },
      {
          "subject": "does health insurance cost, health insurance cost",
          "question": "How much does health insurance cost?",
          "answer": "Just visit us at getkindhealth.com for a free quote. When you decide to buy, you can do so right there on the website. It’ll only take a couple of minutes and it’s free to use.",
      },
      {
          "subject": "does dental insurance cost, dental insurance cost",
          "question": "How much does dental insurance cost?",
          "answer": "Just visit us at getkindhealth.com for a free quote. When you decide to buy, you can do so right there on the website. It’ll only take a couple of minutes and it’s free to use.",
      },
      {
          "subject": "does vision insurance cost, vision insurance cost",
          "question": "How much does vision insurance cost?",
          "answer": "Just visit us at getkindhealth.com for a free quote. When you decide to buy, you can do so right there on the website. It’ll only take a couple of minutes and it’s free to use.",
      },
      {
          "subject": "does life insurance cost, life insurance cost",
          "question": "How much does life insurance cost?",
          "answer": "Just visit us at getkindhealth.com for a free quote. When you decide to buy, you can do so right there on the website. It’ll only take a couple of minutes and it’s free to use.",
      },
      {
          "subject": "does short term health insurance cost, short term health insurance cost",
          "question": "How much does short term health insurance cost?",
          "answer": "Just visit us at getkindhealth.com for a free quote. When you decide to buy, you can do so right there on the website. It’ll only take a couple of minutes and it’s free to use.",
      },
      {
          "subject": "does cancer insurance cost, cancer insurance cost",
          "question": "How much does cancer insurance cost?",
          "answer": "Just visit us at getkindhealth.com for a free quote. When you decide to buy, you can do so right there on the website. It’ll only take a couple of minutes and it’s free to use.",
      },
      {
          "subject": "need health insurance, i need health insurance",
          "question": "Why do I need health insurance?",
          "answer": "You need health insurance because you cannot predict what your medical bills will be. In some years, your costs may be low. In other years, you may have very high medical expenses. If you have health insurance, you will have peace of mind in knowing that you are protected from most of these costs.",
      },
      {
          "subject": "service cost me anything, cost me anything",
          "question": "Will using your service cost me anything?",
          "answer": "All the services offered by KindHealth are provided at no extra cost to you, the consumer. If you buy a health insurance plan through KindHealth, you'll pay the regular monthly premium to the health insurance company you chose, but you'll pay nothing to us. Our fees are paid by the insurance companies in the form of commissions, which are built into the premium amount.",
      },
      {
          "subject": "i have a pre-existing condition, if i have a pre-existing condition, if i have a pre existing condition, if i have a preexisting condition, i have a pre existing condition, i have a preexisting condition",
          "question": "Can I get health insurance if I have a pre-existing condition?",
          "answer": "Yes, the Affordable Care Act made it illegal to deny coverage if you have a pre-existing condition.",
      },
      {
          "subject": "fee for your services, fee for services",
          "question": "Do you charge a fee for your services?",
          "answer": "No, we do not charge a fee. Our services are free for you to use.",
      },
      {
          "subject": "make money",
          "question": "How do you make money?",
          "answer": "The insurance companies pay us a commission for each application we submit. They each pay about the same so there’s no incentive for us to promote one plan over another.",
      },
      {
          "subject": "companies do you work with, work with",
          "question": "What insurance companies do you work with?",
          "answer": "WE WORK WITH ALL MAJOR CARRIERS such as aetna, vista360, oscar, molina, blue cross blue shield, cigna, Humana, kaiser and many more. We’re also 1 of 5 national partners to sell healthcare.gov plans.",
      },
      {
          "subject": "best price, best prices",
          "question": "Do you offer the best prices?",
          "answer": "Health insurance premiums are regulated by your state's Department of Insurance. Whether you buy from KindHealth, your local agent, or directly from the health insurance company, you'll pay the same monthly premium for the same plan. This means that you can enjoy the advantages and convenience of shopping and purchasing your health insurance plan through KindHealth and rest assured that you're getting the best available price.",
      },
      {
          "subject": "individual health insurance, is individual health insurance",
          "question": "What is individual health insurance?",
          "answer": "Individual health insurance is a type of health insurance coverage that is made available to individuals and families, rather than to employer groups or organizations. You may be pleasantly surprised with the variety and affordability of the individual health insurance options available.",
      },
      {
          "subject": "individual insurance plans are available, individual insurance plans",
          "question": "What kinds of individual insurance plans are available?",
          "answer": "Individual health insurance plans are usually described as either indemnity or managed-care plans. Typically, indemnity plans offer a broader selection of healthcare providers than managed care plans. Indemnity plans pay their share of the costs for covered services only after they receive a bill (which means that you may have to pay up front and then obtain reimbursement from your health insurance company). There are several different types of managed-care health insurance plans. These include HMO, PPO, and POS plans. Managed-care plans typically make use of healthcare provider networks. Healthcare providers within a network agree to perform services for managed-care plan patients at pre-negotiated rates and will usually submit the claim to the insurance company for you. In general, you'll have less paperwork and lower out-of-pocket costs with a managed care health insurance plan and a broader choice of healthcare providers with an indemnity plan.",
      },
      {
          "subject": "ppo plan work, p p o plan work",
          "question": "How does a PPO plan work?",
          "answer": "As a member of a PPO plan, you'll be encouraged to use the insurance company's network of preferred doctors and hospitals. These healthcare providers have been contracted to provide services to the health insurance plan's members at a discounted rate. You typically won't be required to pick a primary care physician but will be able to see doctors and specialists within the network at your own discretion.",
      },
      {
          "subject": "h m o plan work, hmo plan work, hmo work, h m o work",
          "question": "How does an HMO plan work?",
          "answer": "Though there are many variations, HMO plans typically enable members to have lower out-of-pocket healthcare expenses but also offer less flexibility in the choice of physicians or hospital than other health insurance plans. As a member of an HMO, you'll be required to choose a primary care physician (PCP). Your PCP will take care of most of your healthcare needs. Before you can see a specialist, you'll need to obtain a referral from your PCP.",
      },
      {
          "subject": "pos plan work, p o s plan work, p o s work, pos work",
          "question": "How does a POS plan work?",
          "answer": "A POS plan combines some of the features offered by HMO and PPO plans. As with an HMO, members of a POS plan may be required to choose a primary care physician from the plan's network of providers. Services rendered by your PCP may or may not be subject to a deductible. Also, like HMOs, POS plans typically offer coverage for preventive care visits.",
      },
      {
          "subject": "indemnity plan work",
          "question": "How does an Indemnity plan work?",
          "answer": "A traditional Indemnity plan offers a great deal of freedom in choosing which doctors and hospitals to use, but will probably involve higher out-of-pocket costs and more paperwork. Under an Indemnity plan, you may see whatever doctors or specialists you like, with no referrals required. However, this kind of freedom will cost you. You'll likely be required to pay an annual deductible before the insurance company begins to pay on your claims. An Indemnity plan may also require that you pay upfront for services and then submit a claim to the insurance company for reimbursement.",
      },
      {
          "subject": "hsa work, h s a work",
          "question": "How does an HSA work?",
          "answer": "An HSA is a tax-favored savings account that may be used in conjunction with an HSA-compatible high deductible health insurance plan to pay for qualifying medical expenses. Typically, the monthly premium on an HSA-compatible high deductible plan is less expensive than the monthly premium for a lower-deductible health insurance plan. Contributions to an HSA may be made pre-tax, up to certain annual limits. Funds in the HSA may be invested at your discretion. Unused funds remain in the account and accrue interest year-to-year, tax-free.",
      },
      {
          "subject": "fee for your services, fee for services",
          "question": "Do you charge a fee for your services?",
          "answer": "No, we do not charge a fee. Our services are free for you to use.",
      },
      {
          "subject": "difference between in-network and out-of-network providers, in-network and out-of-network providers",
          "question": "What is the difference between in-network and out-of-network providers?",
          "answer": "An in-network provider is one contracted with the health insurance company to provide services to plan members for specific pre-negotiated rates. An out-of-network provider is one not contracted with the health insurance plan.",
      },
      {
          "subject": "best health insurance plan for me, best insurance plan for me, health insurance plan for me",
          "question": "What's the best health insurance plan for me?",
          "answer": "Choosing between different health insurance plans isn't always easy. There is no one best plan for everyone. The best match for you and your family may be different than the best match for someone else. In order to help you answer this question, check us out at getkindhealth.com. We can give you recommendations based on your needs and budget.",
      },
      {
          "subject": "my coverage start, coverage start, coverage start date",
          "question": "When does my coverage start?",
          "answer": "In general, if you apply between the 1st and 15th of the current month, your start date is the 1st of the next month. If you apply after the 15th of the current month, your start date is usually the 1st of the month after the next. If you purchase a plan during open enrollment, the effective date is usually January 1st.",
      },
      {
          "subject": "i shop with you, shop with you, buy with you, buy from you",
          "question": "Why should I shop with you?",
          "answer": "By combining the localized knowledge of a neighborhood agent with the broad experience and comprehensive understanding of a leading online health insurance source, we are able to offer our customers a Broad Selection. Because we are a health insurance agency and not a health insurance company, we can offer plans from multiple insurance companies in your area. KindHealth offers the fastest way to apply for health insurance because many of the plans offered on our website can be submitted and signed electronically, eliminating the need to manually print and mail applications. This reduces average processing time significantly.",
      },
      {
          "subject": "protect my private information, private information, my private information",
          "question": "How do you protect my private information?",
          "answer": "Shopping with KindHealth is safe. As your health insurance agent, we're committed to protecting your privacy and the information you provide to us. KindHealth will not sell, trade or give away your personal information to anyone, except those specifically involved in the referral or processing of your health insurance quote or application. We use industry-leading technologies to ensure the security of all the information under our control. We encourage you to read through our Privacy Policy online. If you have any questions about our privacy policy or how your personal information is protected at KindHealth, contact us by email at hello@getkindhealth.com.",
      },
      {
          "subject": "health insurance payments, insurance payments, insurance payment, insurance an payment",
          "question": "How do I make health insurance payments?",
          "answer": "In most cases, when you complete your application you'll provide a credit card number or a check written to the health insurance company for the first premium payment. Typically, your credit card will not be charged nor will your check be cashed until you are approved for coverage. If you are not approved for coverage, or if you cancel your application, your card will not be charged and any check payment you made will be returned or refunded. Once you've been approved for coverage, your ongoing premium payments are paid to your health insurance company typically on a monthly or quarterly basis. Insurance companies typically offer several payment options including monthly billings to be paid by check or credit card, automatic bank drafts or automated credit card charges.",
      },
      {
          "subject": "do i have to buy, i have to buy the plan",
          "question": "If I apply for an insurance plan, do I have to buy?",
          "answer": "No. You are under no obligation to buy a health insurance plan when using our site. After submitting your application you may cancel it at any time during the enrollment process. When you submit an application you will typically include your credit card number, bank account information, or a check for the initial premium payment. Most insurance companies will not charge your card, debit your account, or deposit your check until you are approved.",
      },
      {
          "subject": "best prices, best price",
          "question": "Do you offer the best prices?",
          "answer": "Health insurance premiums are filed with and regulated by your state's Department of Insurance. Whether you buy from KindHealth, your local agent, or directly from the health insurance company, you'll pay the same monthly premium for the same plan. This means that you can enjoy the advantages and convenience of shopping and purchasing your health insurance plan through KindHealth and rest assured that you're getting the best available price.",
      },
      {
          "subject": "contact someone if i need help , contact someone for help, contact",
          "question": "Can I contact someone if I need help?",
          "answer": "Yes. Our licensed insurance agents and knowledgeable representatives are ready to help you. Just call 888-871-3864 Mon - Fri, 9AM-5PM CST. Mon - Fri. Email Us at hello@getkindhealth.com and one of our knowledgeable Kind Advisors will reply to you soon. Chat with us online at getkindhealth.com Our chat option is available 24 hours a day, 7 days a week, excluding holidays.",
      },
      {
          "subject": "without my insurance card, without insurance card",
          "question": "Can I use my plan without my insurance card?",
          "answer": "You can typically use your health plan after the insurance company approves your application and issues you a policy number, starting from the coverage start date. Many doctors' offices will accept your policy number for billing purposes before you receive your card.",
      },
      {
          "subject": "include dental and vision benefits, insurance plans include dental and vision benefits, include dental and vision",
          "question": "Do short-term health insurance plans include dental and vision benefits?",
          "answer": "No. Short-term health insurance plans are designed to protect you in the event of an unexpected illness or injury and are not intended to cover dental and vision care. Short-term health insurance plans are for temporary coverage only and therefore do not include some of the benefits offered by standard, longer-term health insurance plans.",
      },
      {
          "subject": "dental insurance work, dental work",
          "question": "How does dental insurance work?",
          "answer": "Dental insurance works in much the same way that medical insurance works. For a specific monthly rate, you are entitled to certain dental benefits, usually including regular checkups, cleanings, x-rays, and certain services required to promote general dental health. o",
      },
      {
          "subject": "kinds of dental plans are available, kind of dental plans are available, dental plans are available",
          "question": "What kinds of dental plans are available?",
          "answer": "Like health insurance plans, dental insurance plans are usually categorized as either Indemnity or managed-care plans. Put broadly, the major differences concern choice of dental care providers, out-of-pocket costs and how bills are paid. Typically, Indemnity plans offer a broader selection of dental care providers than managed-care plans. Indemnity plans pay their share of the costs for covered services only after they receive a bill (which means that you may have to pay up front and then obtain reimbursement from your insurance company). Managed-care plans typically maintain dental provider networks. Dentists participating in a network agree to perform services for patients at pre-negotiated rates and usually will submit the claim to the dental insurance company for you. In general, you'll have less paperwork and lower out-of-pocket costs with a managed-care dental plan and a broader choice of dentists with an Indemnity plan.",
      },
      {
          "subject": "dental ppo, dental p p o, dental ppo plan, dental p p o plan",
          "question": "What is a Dental PPO?",
          "answer": "Dental PPO (Preferred Provider Organization or Participating Provider Organization) plans are perhaps the most common type of managed care dental insurance plans. Most Dental PPO plans require you to pay a deductible. With a Dental PPO plan the patient typically obtains care through a network of dental providers who agree to serve the plan's members at reduced rates. When you use a network provider, you will typically pay a certain percentage of the reduced rate, and the insurance company will pay the remaining percentage.",
      },
      {
          "subject": "dental indemnity plan, indemnity dental plan",
          "question": "What is a Dental Indemnity plan?",
          "answer": "A Dental Indemnity plan is commonly known as a fee-for-service or traditional plan. If you select an Indemnity plan you'll likely have the freedom to visit any dentist you wish. You typically will not be required to obtain referrals; however, some plans may require you to obtain preauthorization for certain procedures.",
      },
      {
          "subject": "in-network and an out-of-network dentist, in network and an out of network dentist",
          "question": "What is the difference between an in-network and an out-of-network dentist?",
          "answer": "An in-network dentist is one contracted with the dental insurance company to provide services to plan members for specific pre-negotiated rates. An out-of-network dentist is not contracted with the insurance company.",
      },
      {
          "subject": "best dental prices, dental prices",
          "question": "Do you offer the best dental prices?",
          "answer": "Dental insurance rates are filed with and regulated by each state's Department of Insurance. Whether you buy your dental insurance plan through KindHealth, another licensed agent, or the dental insurance company, you will pay the same monthly rate for the same plan.",
      },
      {
          "subject": "familiar with, other dental insurance plans that I am familiar with",
          "question": "Where are the other dental insurance plans that I am familiar with?",
          "answer": "The variety of dental coverage available to individuals and families, businesses or groups differ by dental health insurance providers",
      },
      {
          "subject": "dental hmo plan, dental h m o plan, dental hmo, dental h m o",
          "question": "What is a Dental HMO Plan?",
          "answer": "HMO dental insurance plans typically require that members obtain services only from a select group of dental providers in order to be covered. Dental HMO plans may sometimes offer less expensive monthly premiums, but may also allow you less freedom to choose your own dentist.",
      },
      {
          "subject": "dental network plan, dental plan network",
          "question": "What is a Dental Network plan?",
          "answer": "A network of dentists that have agreed to provide dental services to a health insurance plan's members at discounted costs. While the health plan's members are free to use any dental care provider, the cost to use network providers is less than using non-network providers.",
      },
      {
          "subject": "what is vision insurance",
          "question": "What is Vision Insurance?",
          "answer": "Vision insurance is generally a supplemental insurance to other types of medical insurance policies. Vision insurance will help offset the costs of routine checkups as well as help pay for vision correction wear that may be prescribed by the attending physician.",
      },
      {
          "subject": "an eye exam, eye exam",
          "question": "Why Do I need an eye exam?",
          "answer": "Thorough eye exams are essential, not just for detecting vision problems, but as an important preventive measure for maintaining overall health and wellness. It does more than just help you see well. It can also help your doctor see signs of common health conditions like high cholesterol, high blood pressure and diabetes.",
      },
      {
          "subject": "routine eye exam and a contact lens exam, eye exam and a contact exam",
          "question": "What is the difference between a routine eye exam and a contact lens exam?",
          "answer": "Routine eye exams are an important preventive measure for maintaining your overall health and wellness. During an eye exam, your doctor can look for vision problems and signs of serious medical conditions such as glaucoma, cataracts, diabetes, and even cancer. During a contact lens exam, your doctor will evaluate your vision with contacts. Although your vision may be clear and you feel no discomfort from your lenses, there are potential risk factors with improper fitting of contact lenses that can affect the overall health of your eyes.",
      },
      {
          "subject": "health savings account work, health account work",
          "question": "How does a Health Savings Account Work?",
          "answer": "A Health Savings Account is a savings account designed to help consumers save and pay for their healthcare expenses on a tax-advantaged basis. Funds can be deposited by consumers into the account on a tax-free basis and may be withdrawn without tax consequences to pay for qualified medical expenses. Employers may also deposit money into an employee's Health Savings Account on a tax-free basis. Funds in the account may be invested and earnings will not be taxed, and unused money will roll over from year to year. Health Savings Accounts may only be used in conjunction with HSA-compatible health insurance plans. Health Savings Accounts, used in combination with HSA-compatible health insurance plans, give consumers control over how their healthcare dollars are spent, and provide a valuable means of saving and investing for healthcare needs and for retirement.",
      },
      {
          "subject": "hsa, h s a",
          "question": "What is an HSA?",
          "answer": "HSA stands for Health Savings Account. HSAs allow consumers to pay for qualified medical expenses with pre-tax dollars—meaning income-tax free—and save for retirement on a tax-deferred basis. Pre-tax money is deposited each year into an HSA and can be easily withdrawn at any time with no penalty or taxes to pay for qualified medical expenses. Withdrawals can also be made for non-medical purposes, but will be taxed as normal income and are subject to a 10 percent penalty if done prior to age 65. Any HSA funds not used each year remain in the account, and earn interest tax-free to supplement medical expenses at any time in the future. Like an IRA, the account belongs to you, not your employer. But unlike an IRA, your employer CAN contribute to your HSA.",
      },
      {
          "subject": "why should i consider getting a hsa, why should i consider getting a h s a",
          "question": "Why should I consider getting a HSA?",
          "answer": "You may save money in the short and long term by: Deducting 100% of your HSA contributions from your taxable income, Having the money in your HSA accrue interest and/or gains on a tax-free basis, Paying no penalties or taxes when you use your HSA to pay for qualified medical expenses, Having a high-deductible HSA-compatible health insurance plan, which typically has a lower, premium than a plan with a lower deductible",
      },
      {
          "subject": "qualified medical expenses, qualified expenses, qualified medical expense, qualified expense",
          "question": "What are qualified medical expenses?",
          "answer": "HSAs can be used to pay for many types of medical expenses. These include Health insurance plan deductibles, copayments, and coinsurance Prescription and over-the-counter drugs Dental services, including braces, bridges, and crowns Vision care, including glasses and lasik eye surgery Psychiatric and certain psychological treatments Long-term care services Medically-related transportation and lodging, Typically HSAs cannot be used to pay health insurance premiums.",
      },
      {
          "subject": "hsa compatible, h s a compatible",
          "question": "What insurance plans are HSA-compatible?",
          "answer": "In order to have a Health Savings Account, you must get an HSA-compatible health insurance plan. This type of insurance plan is often referred to as a High Deductible Health Plan, and typically has lower premiums than plans with lower deductibles.",
      },
      {
          "subject": "contribute to my hsa, contribute to my h s a",
          "question": "How much can I contribute to my HSA?",
          "answer": "For individuals, it is $3,450, and for families it is $6,900. If you are between the ages of 55 and 65, you can make an additional annual catch up contribution of $1,000.",
      },
      {
          "subject": "can i roll over funds from other accounts into my hsa, can i roll over funds from other accounts into my h s a ",
          "question": "Can I roll over funds from other accounts into my HSA?",
          "answer": "You can make a one-time distribution from an IRA to fund your HSA, provided it doesn't exceed HSA contribution limits. Employees have the opportunity for a one-time, tax-free transfer of funds from their flexible spending account or health reimbursement arrangement to their HSA.",
      },
      {
          "subject": "h s a account safe, hsa account safe",
          "question": "Is the money in my HSA account safe?",
          "answer": "Funds in an HSA are held in a trust and are administered by a bank, insurance company, or other approved Trustee. This institution is often referred to as your HSA Administrator. Funds in your HSA are invested at your discretion.",
      },
      {
          "subject": "usa my h s a, use my hsa",
          "question": "How do I use my HSA?",
          "answer": "Using funds in your Health Savings Account is easy: Typically an HSA will provide you with a checkbook or debit card., When you pay for a qualified medical expenses, use the debit card or check to make the payment., You do not need to get approval from the HSA administrator when you use funds in your account., You do not need to submit receipts to the HSA administrator, although you should save them just, as you keep receipts for other items that are deducted from your taxes.",
      },
      {
          "subject": "investment options in an hsa, investment options in an h s a",
          "question": "What are my investment options in an HSA?",
          "answer": "We partner with Optum to provide you with the best HSA option.",
      },
      {
          "subject": "tax savings work, hsa tax savings work, h s a tax savings work",
          "question": "How do the HSA tax savings work?",
          "answer": "Check with your accountant or tax advisor for the specific federal and state tax benefits that apply to you.",
      },
      {
          "subject": "fee with an hsa, fees with an h s a, fee with a hsa, fees with a h s a",
          "question": "Are there fees associated with an HSA?",
          "answer": "Depending on which institution is the HSA Administrator for your Health Savings Account, you may be subject to different fees, including: initial setup fee, monthly maintenance fee, and check fees.",
      },
      {
          "subject": "hsa through kind health, h s a through kind health",
          "question": "Why should I get my HSA through KindHealth?",
          "answer": "Here are just a few reasons to obtain your HSA through KindHealth: We offer a broad selection of insurance plans, which makes it easy for you find an HSA-compatible health insurance plan that fits your particular needs. We clearly identify the HSA-compatible health insurance plans so that you won't select an insurance plan which is not eligible.",
      },
      {
          "subject": "how can i get an hsa, how do i get an hsa, how can i get an h s a, how do i get an h s a",
          "question": "How can I get an HSA?",
          "answer": "HSAs are available to any person in the U.S. under the age of 65 who has an HSA-compatible health insurance plan. To get an HSA, you need to do the following: Go to getkindhealth.com to shop for an HSA-compatible health insurance plan. Once you enroll in an HSA eligible plan, we will automatically enroll you in a KindHealth HSA account with Optum Bank to make it as easy as possible. You will receive your HSA debit card within 10 days. You can also opt out of this service if you’d like.",
      }
      ]
    };
    
  const healthCareVideos = {
    "information" : [
      {
          "subject": "affordable health insurance, affordable insurance, affordable healthcare insurance",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Affordable+Health+insurance%252C+really%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/Affordable+Health+Insurance.mp3' />",
          "title": "Affordable Health Insurance.",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "can anyone buy Health Insurance, buy health insurance",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Can+anyone+buy+health+insurance%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/Can+anyone+buy+Health+Insurance.mp3' />",
          "title": "Can anyone buy Health Insurance?",
          "subtitle": "Kind Health", 
      },
       {
          "subject": "can i cover my family, covering my family, covering family",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Can+I+cover+family+on+my+health+insurance%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/Can+I+cover+my+family+on+my+Health+Insurance.mp3' />",
          "title": "Can I cover my family?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "can i list my physicians assistant as my primary care physician, list my physicians assistant as my primary care physician",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Can+I+list+my+physicians+assistant+as+my+primary+care+physician%253F.mp4",
          "audio": "Sorry, this is only available video form",
          "title": "Can I list my PA as my Primary Care Physician?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "can i use someone else's health insurance, use someone's health insurance, someone's health insurance",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Can+I+use+someone+else%2527s+health+insurance%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/can+i+use+someone+else+insurance.mp3' />",
          "title": "Can I use someone else's Health Insurance?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "explaining overseas travel for an extended period of time, overseas travel, extended period of time",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Can+you+explain+how+health+insurance+works+when+traveling+overseas+for+an+extended+period+of+time%253F.mp4",
          "audio": "Sorry, this is only available video form",
          "title": "Explaining overseas travel for an extended period of time.",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "climbing the health insurance mountain, climbing the mountain, health insurance mountain",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Climbing+the+Health+Insurance+Mountain.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/climbing+the+mountain.mp3' />",
          "title": "Climbing the Health Insurance Mountain!",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "purchased health insurance, i just purchased health insurance",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Congratulations%2521+You+Just+Purchased+Awesome+Health+Insurance.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/congratsPurchasedHI.mp3' />",
          "title": "Congrats! You purchased awesome Health Insurance!",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "do i get a health insurance subsidy, health insurance subsidy, subsidy",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Do+I+get+a+health+insurance+subsidy%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/health+insurance+subsidy.mp3' />",
          "title": "Do I get a Health Insurance Subsidy?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "do i need a dental plan, need a dental plan, dental plan",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Do+I+need+a+dental+plan%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/do+i+need+a+dental+plan.mp3' />",
          "title": "Do I need a dental plan?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "do i pay a penalty for not having health insurance, pay penalty for not having health insurance, pay penalty",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Do+I+pay+a+penalty+for+not+having+health+insurance%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/do+i+pay+a+penalty.mp3' />",
          "title": "Do I pay a penalty for not having Health Insurance?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "does age affect my health insurance cost, health insurance cost, age affect my healthcare costs, age affect my health costs",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Does+age+affect+my+health+insurance+cost%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/does+age+affect+my+health+insurance.mp3' />",
          "title": "Does age affect my Health Insurance Cost?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "does healthcare.gov have the cheapest plans, cheapest plans, cheapest plan",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Does+healthcare.gov+have+the+cheapest+plans%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/does+healthcare+gov+have+cheapest+rates.mp3' />",
          "title": "Does healthcare.gov have the cheapest plans?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "find the right healthcare plan, finding the right healthcare plan, i need to find the right healthcare plan, the right plan, the right healthcare plan",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Find+the+Right+Healthcare+Plan%252C+Pronto.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/find+the+right+plan+for+you.mp3' />",
          "title": "Find the right Healthcare Plan.",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "doctors incentivized to move towards preventative care, incentive towards preventative care, preventative care",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/How+are+doctors+incentivized+to+move+towards+preventative+care%253F.mp4",
          "audio": "Sorry, this is only available video form",
          "title": "Doctors incentivized to move towards preventative care.",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "can i get a lower deductible, lower deductible, how do i get a lower deductible",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/How+can+I+get+a+lower+deductible%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/how+do+i+get+lower+deductible.mp3' />",
          "title": "Can I get a lower deductible?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "college students and healthcare, college and healthcare, college students",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/How+do+college+students+get+health+insurance%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/college+students+and+HI.mp3' />",
          "title": "College Students and HealthCare.",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "is my doctor a specialist, doctor a specialist",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/How+do+I+know+if+my+doctor+is+a+specialist%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/how+do+i+know+if+my+doctor+is+a+specialist.mp3' />",
          "title": "Is my Doctor a specialist?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "comparing health insurance, how do i compare health insurance, i want to compare health insurance, compare health insurance",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/How+do+I+compare+health+insurance%253F.mp4",
          "audio": "Sorry, this is only available video form",
          "title": "Comparing Health Insurance.",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "how does vision and dental factor into the marketplace, vision and dental factor into the marketplace",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/How+does+vision+and+dental+factor+into+the+marketplace%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/how+does+vision+and+dental+factor+in.mp3' />",
          "title": "How does vision and dental factor into the Marketplace?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "how your primary care physician is selected for you, primary care physician is selected for you, how is my primary care physician is selected",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/How+is+your+PCP+assigned+to+you%253F+Can+you+choose+a+different+one+and+if+so%252C+is+there+a+simple+way+to.mp4",
          "audio": "Sorry, this is only available video form",
          "title": "How your PCP is selected for you.",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "how long does it take to enroll, does it take long to enroll",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/How+long+does+it+take+to+enroll+in+health+insurance%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/how+long+does+it+take+to+enroll.mp3' />",
          "title": "How long does it take to enroll?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "how much does a healthcare broker cost, health broker, health broker cost",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/How+much+does+a+health+insurance+broker+cost%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/how+does+a+health+insurance+broker+work.mp3' />",
          "title": "How much does a Healthcare Broker cost?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "how much does health insurance cost, how much does it cost, health insurance costs",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/How+much+does+health+insurance+cost%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/how+much+does+HI+cost.mp3' />",
          "title": "How much does Health Insurance cost?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "picking a plan that works best for me and my family, i need a plan for me and my family, plan for me and my family",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/How+to+pick+a+plan+that+works+best+for+your+families+needs%253F.mp4",
          "audio": "Sorry, this is only available video form",
          "title": "Picking a plan that works best for you and your family.",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "i need the perfect plan, perfect plan",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/How+We+Find+The+Perfect+Health+Insurance+Plan+For+You.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/how+we+find+the+perfect+plan.mp3' />",
          "title": "We find the perfect plan for you!",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "i paid for corba, but by Health insurance is showing up as canceled, health insurance showing canceled, health insurance showing up canceled",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/I+paid+for+my+cobra+last+month+but+my+health+insurance+is+showing+up+as+canceled.+What+should+I+do%253F.mp4",
          "audio": "Sorry, this is only available video form",
          "title": "I paid for Corba, but by Health Insurance is showing up as canceled?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "i am interested in companies that give incentives for exercising, incentives for exercising, exercising, exercising incentives, exercise discounts, exercise discount",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/I%2527m+interested+in+insurance+companies+that+give+incentives+to+people+for+exercising.mp4",
          "audio": "Sorry, this is only available video form",
          "title": "Interested in companies that give incentives for exercising?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "is medication covered by insurance, medication covered, medication and insurance",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Is+my+medication+covered+by+insurance%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/is+my+medication+covered.mp3' />",
          "title": "Is medication covered by Insurance?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "is an obgyn a specialist, is an o b g y n a specialist",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Is+my+OBGYN+a+specialist%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/is+my+obgyn+a+specialist.mp3' />",
          "title": "Is an OBGYN a specialist?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "is there a better place then the marketplace, a better place then the marketplace, better then the marketplace",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Is+there+a+better+way+to+find+affordable+coverage+than+the+Healthcare+Market+place%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/better+way+to+find+affordable+HI+on+marketplace.mp3' />",
          "title": "Is there a better place then the marketplace?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "kind health squirrels, squirrels",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/KindHealth+Squirrels.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/kindhealth+squirrels.mp3' />",
          "title": "Kind Health Squirrels!",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "metallic tier system, tier system",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Metallic+tier+system%252C+What%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/metallic+tier+system.mp3' />",
          "title": "Metallic Tier System.",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "de-suckify insurance, our mission, the mission",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/On+A+Mission+To+De-Suckify+Insurance.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/misson+to+de+suck.mp3' />",
          "title": "Our mission is to De-suckify insurance.",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "peace of mind and protection from monsters, peace of mind, protection from monsters, monsters",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Peace+of+Mind+and+Protection+From+Monsters.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/peace+of+mind+monsters.mp3' />",
          "title": "peace of mind and protection from monsters!",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "swimming in healthcare data, healthcare data",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Swimming+in+Healthcare+Data.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/swimming+in+data.mp3' />",
          "title": "Swimming in healthcare data!",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "truth about our health insurance competitors, health insurance competitors, insurance competitors",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/The+Truth+About+Our+Health+Insurance+Competitors.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/turth+about+competitors.mp3' />",
          "title": "Truth about our Health Insurance Competitors!",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "i am thinking about a limited health plan, limited health plans, limited health plan",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Thinking+about+Limited+Health+Plans%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/thinking+limited+health+plans.mp3' />",
          "title": "Thinking about Limited Health Plans.",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "we love health insurance and elephants, we love health insurance, elephants",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/We+Love+Health+Insurance...+And+Elephants.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/HI+elephants.mp3' />",
          "title": "We love Health Insurance and elephants!",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "welcome to Kind health, too kind health",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Welcome+to+Kindhealth+TV+%2521.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/welcome+to+kind+health.mp3' />",
          "title": "Welcome to Kindhealth!",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what are the differences between health insurance carriers, differences between health insurance carriers, different health insurance carriers, health insurance carriers",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+are+the+differences+between+health+insurance+carriers%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/differences+between+carriers.mp3' />",
          "title": "What are the differences between health insurance carriers?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what are the deadlines for open enrollment, open enrollment deadline",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+are+the+health+insurance+deadlines+in+open+enrollment.mp4",
          "audio": "Sorry, this is only available video form",
          "title": "What are the deadlines for open enrollment?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what do you mean personal health advocate, personal health advocate, health advocate",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+do+you+mean+Personal+Health+Advocate_+%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/what+do+you+mean+personal+health+adocv.mp3' />",
          "title": "What do you mean Personal Health Advocate?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what does health insurance cover, health insurance coverage, insurance coverage",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+does+health+insurance+cover%253F.mp4",
          "audio": "Sorry, this is only available video form",
          "title": "What does Health Insurance Cover?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what does out of pocket mean, out of pocket mean, out of pocket mean",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+does+out+of+pocket+mean%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/out+of+pocket+mean.mp3' />",
          "title": "What does out of pocket mean?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what if i have an out of network emergency, out of network emergency",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+happens+if+I+have+an+out-of-network+emergency%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/out+of+network+emergency.mp3' />",
          "title": "What if I have an out of network emergency?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what if i miss open enrollment, miss open enrollment, i missed open enrollment",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+happens+if+I+miss+open+enrollment%253F.mp4",
          "audio": "Sorry, this is only available video form",
          "title": "What if I miss open enrollment?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what is a copay, what is a co pay, what is a co-pay, what is a copayment, copayment",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+is+a+copay%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/what+is+a+copay.mp3' />",
          "title": "What is a copay?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what is a deductible, what are deductibles",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+is+a+deductible%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/what+is=a+deductible.mp3' />",
          "title": "What is a deductible?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what is a health insurance network",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+is+a+health+Insurance+Network%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/what+is+a+HI+Network.mp3' />",
          "title": "What is a Health Insurance Network?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what is a health saving account, do i need a health savings account",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+is+a+health+savings+account%253F.mp4",
          "audio": "Sorry, this is only available video form",
          "title": "What is a Health Saving Account?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what is a high deductible plan, high deductible plan, high deductible",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+is+a+high-deductible+health+plan%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/high+deductbile+health+plan.mp3' />",
          "title": "What is a high deductible plan?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what is a p o s, what is a pos, what is a point of service plan",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+is+a+POS%253F+%2528hey%252C+now%2521+Keep+it+clean%2529.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/pos+keep+it+clean.mp3' />",
          "title": "What is a POS?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what is a ppo, what is a preferred provider organization plan, preferred provider organization",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+is+a+PPO%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/what+is+a+ppo.mp3' />",
          "title": "What is a PPO?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what is a preexisting condition",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+is+a+pre-existing+condition%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/preexisiting+condition.mp3' />",
          "title": "What is a preexisting condition?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what is a primary care physician, what is a p c p, what is a pcp",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+is+a+primary+care+physician%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/what+is+a+primary+care+p.mp3' />",
          "title": "What is a primary care physician?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what is a qualifying event, qualifying event",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+is+a+qualifying+event%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/qualifiyng+event.mp3' />",
          "title": "What is a qualifying event?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what is an epo, what is an e p o",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+is+an+EPO%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/what+is+an+epo.mp3' />",
          "title": "What is an EPO?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "who manages my h s a account, who manages my hsa account, manages hsa accounts, manages h s a accounts",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+is+an+HSA+account%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/who+manages+hsa+account.mp3' />",
          "title": "Who manages my HSA Account",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what is an online exchange plan, online exchange plan",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+is+an+on-exchange+plan%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/on+exchange+plan.mp3' />",
          "title": "What is an online exchange plan?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what is considered tobacco use, what is tobacco use",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+is+considered+tobacco+use+for+health+insurance%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/what+is+tobacco+user.mp3' />",
          "title": "What is considered tobacco use?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what is Health insurance",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+is+health+insurance%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/what+is+HI.mp3' />",
          "title": "What is Health insurance?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what is open enrollment",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+is+open+enrollment%253F.mp4",
          "audio": "Sorry, this is only available video form",
          "title": "What is open enrollment?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what is the best plan for me, i need the best plan for me",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+is+the+best+plan+for+me%253F.mp4",
          "audio": "Sorry, this is only available video form",
          "title": "What is the best plan for me?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what is the deadline for signing up for healthcare, what is the deadline for signing up for healthcare insurance, what is the sign up deadline",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+is+the+deadline+for+signing+up+for+health+coverage%253F.mp4",
          "audio": "Sorry, this is only available video form",
          "title": "What is the deadline for signing up for Healthcare?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what is the scarlet letter law, scarlet letter law",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What+is+the+Scarlet+Letter+Law%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/scarlet+letter+law.mp3' />",
          "title": "What is the Scarlet Letter Law?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what does an insurance broker do, insurance broker",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What%2527s+does+a+insurance+broker+do%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/HI+Broker.mp3' />",
          "title": "What does an Insurance Broker Do?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what is an h m o, what is an hmo",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What%2527s+is+an+HMO%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/what+is+a+hmo.mp3' />",
          "title": "What is an HMO?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what is the difference between preferred and non-preferred drugs, difference between preferred and non-preferred drugs, preferred and non-preferred drugs",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/What%2527s+the+difference+between+preferred+and+non-preferred+drugs%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/preferred+non+preffered+drugs.mp3' />",
          "title": "What is the difference between preferred and non-preferred drugs?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "where did my ppo go, where did my p p o go, where did p p o go, where did ppo go",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Where%2527d+my+PPO+go%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/where+did+my+ppo+go.mp3' />",
          "title": "Where did my PPO go?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "what manages my hsa account, what manages my h s a account",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Who+manages+my+HSA+account%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/who+manages+hsa+account.mp3' />",
          "title": "What manages my HSA Account?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "why are my health insurance premiums going up, health insurance premiums going up",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Why+are+my+health+insurance+premiums+going+up%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/why+pre+goes+up.mp3' />",
          "title": "Why are my Health Insurance Premiums going up?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "why are people mad about obamacare, obamacare",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Why+are+people+mad+about+Obamacare%253F.mp4",
          "audio": "Sorry, this is only available video form",
          "title": "Why are people mad about Obamacare?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "why did my insurance plan change at the end of the year, insurance plan change at the end of the year",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Why+did+my+health+insurance+plan+change+at+the+end+of+the+year%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/plan+change+at+the+end+of+the+year.mp3' />",
          "title": "Why did my Insurance Plan change at the end of the year?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "why is health insurance so expense, health insurance so expense",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Why+is+health+insurance+so+expensive%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/why+HI+so+expensive.mp3' />",
          "title": "Why is Health Insurance so expense?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "why are we still using fax machines, fax machines, fax machine",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Why+on+earth+are+they+still+using+fax+machines%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/fax+machines.mp3' />",
          "title": "Why are we still using fax machines?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "will an hsa save me money, will an h s a save me money, will hsa save me money, will h s a save me money",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Will+an+HSA+save+me+money%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/will+an+HSA+save+me+money.mp3' />",
          "title": "Will an HSA save me money?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "will my healthcare cover pregnancy, healthcare cover pregnancy, pregnancy",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Will+my+healthcare+cover+pregnancy%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/will+HI+cover+pregency.mp3' />",
          "title": "Will my HealthCare cover pregnancy?",
          "subtitle": "Kind Health", 
      },
      {
          "subject": "will my plan cover weight loss surgery, weight loss surgery",
          "video" : "https://s3.amazonaws.com/buttonpush/videos/Will+my+plan+cover+weight+loss+surgery%253F.mp4",
          "audio": "<audio src='https://s3.amazonaws.com/buttonpush/audio/wieght+loss.mp3' />",
          "title": "Will my plan cover weight loss surgery?",
          "subtitle": "Kind Health", 
      }
      ]
  };
    
////////////////////////////////////

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'mainMenu'
        || request.intent.name === 'yesIntent');
  },
  handle(handlerInput) {
    const randomIntro = cookbook.getRandomItem(openings);
    const cardTitle = "Welcome, how can we help!";
    const cardText = cookbook.getRandomItem(webStats);
    const speechOutput = randomIntro;
    const reprompt = "Which would you like?";
    const SMALLIMAGE = 'https://s3.amazonaws.com/kindhealth/IconSC.png'; 
    const LARGEIMAGE = 'https://s3.amazonaws.com/kindhealth/IconLC.png';
    
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(reprompt)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const lostCardHandler = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'lostCardIntent');
  },
  handle(handlerInput) {
    const lost = cookbook.getRandomItem(lostCard);
    const cardTitle = "Sorry to here about your insurance card.";
    const speechOutput = lost;
    const cardText = 'Phone: 1 (888) 871-3864 \nEmail: hello@getkindhealth.com \nWebsite:\n https://www.kindhealth.co \nTwitter: @KINDCares \nYoutube: Kindhealth \nAddress: 1409 W 3rd St Austin, TX 78703';
    const SMALLIMAGE = 'https://s3.amazonaws.com/kindhealth/IconSC.png'; 
    const LARGEIMAGE = 'https://s3.amazonaws.com/kindhealth/IconLC.png';

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(cardTitle)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const customerServiceHandler = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'customerServiceIntent');
  },
  handle(handlerInput) {
    
    const custService = cookbook.getRandomItem(customerService);
    const cardTitle = "How can we help you!";
    const speechOutput = custService;
    const cardText = 'Phone: 1 (888) 871-3864 \nEmail: hello@getkindhealth.com \nWebsite:\n https://www.kindhealth.co \nTwitter: @KINDCares \nYoutube: Kindhealth \nAddress: 1409 W 3rd St Austin, TX 78703';
    const SMALLIMAGE = 'https://s3.amazonaws.com/kindhealth/IconSC.png'; 
    const LARGEIMAGE = 'https://s3.amazonaws.com/kindhealth/IconLC.png';

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(cardTitle)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const avIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'avIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const itemSlot = handlerInput.requestEnvelope.request.intent.slots.videoSubjects;
    let itemName;
    if (itemSlot && itemSlot.value) {
      itemName = itemSlot.value.toLowerCase();
    }
    
    function supportsDisplay(handlerInput){
      const hasDisplay =
        handlerInput.requestEnvelope.context &&
        handlerInput.requestEnvelope.context.System &&
        handlerInput.requestEnvelope.context.System.device &&
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;

      console.log("Supported Interfaces are "+ JSON.stringify(handlerInput.requestEnvelope.context.System.device.supportedInterfaces));
      return hasDisplay;
    }
    
      if(supportsDisplay(handlerInput) && handlerInput.requestEnvelope.context.System.device.supportedInterfaces.VideoApp){
        
        const information = randomArrayElement(getAnswersByVideoSubject(itemName));
          
          sessionAttributes.information = information.video;
          sessionAttributes.information = information.title;
          sessionAttributes.information = information.subtitle;
          
        handlerInput.responseBuilder.addVideoAppLaunchDirective(information.video, information.title, information.subtitle);

        return handlerInput.responseBuilder.speak("We have a video for that").getResponse();
        
        } else {
          const responseBuilder = handlerInput.responseBuilder;
          
          const information = randomArrayElement(getAnswersByVideoSubject(itemName));
          
          sessionAttributes.information = information.audio;
          sessionAttributes.information = information.title;
          
          const cardTitle = information.title;
          const cardText = 'Phone: 1 (888) 871-3864 \nEmail: hello@getkindhealth.com \nWebsite:\n https://www.kindhealth.co \nTwitter: @KINDCares \nYoutube: Kindhealth';
          const SMALLIMAGE = 'https://s3.amazonaws.com/kindhealth/IconSC.png'; 
          const LARGEIMAGE = 'https://s3.amazonaws.com/kindhealth/IconLC.png';
          const speechOutput = "We have an audio clip for that" + information.audio;
          
          return responseBuilder
              .speak(speechOutput)
              .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
              .getResponse();
          
        }
  },
};

const faqHandler = {
  canHandle(handlerInput) {
       return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'faqIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const itemSlot = handlerInput.requestEnvelope.request.intent.slots.faqSubjects;
    let itemName;
    if (itemSlot && itemSlot.value) {
      itemName = itemSlot.value.toLowerCase();
    }
    
    if (itemName) {
          
          const responseBuilder = handlerInput.responseBuilder;
          
          const SMALLIMAGE = 'https://s3.amazonaws.com/kindhealth/IconSC.png'; 
          const LARGEIMAGE = 'https://s3.amazonaws.com/kindhealth/IconLC.png';
    
          const information = randomArrayElement(getAnswersBySubject(itemName));
          
          sessionAttributes.information = information.answer;
          sessionAttributes.information = information.question;
          
          const speechOutput = information.answer;
          const cardTitle = information.question;
          const cardText = information.answer;
          const reprompt = "Can I help you with anything else?";
          
          return responseBuilder
              .speak(speechOutput)
              .reprompt(reprompt)
              .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
              .getResponse();
      
    } else {
      
          const responseBuilder = handlerInput.responseBuilder;
          
          const SMALLIMAGE = 'https://s3.amazonaws.com/kindhealth/IconSC.png'; 
          const LARGEIMAGE = 'https://s3.amazonaws.com/kindhealth/IconLC.png';
          const speechOutput = "Sorry, I didn't get that please try again!";
          const reprompt = "Please try again";
          
          return responseBuilder
              .speak(speechOutput)
              .reprompt(reprompt)
              .getResponse();
    }
  }
};

const callHandler = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'callIntent');
  },
 handle(handlerInput) {
   const itemSlot = handlerInput.requestEnvelope.request.intent.slots.phoneNumbers;
   
    let itemName;
    if (itemSlot && itemSlot.value) {
      itemName = itemSlot.value.toLowerCase();
    }
   
    if (itemName) {
        const SMALLIMAGE = 'https://s3.amazonaws.com/kindhealth/IconSC.png'; 
        const LARGEIMAGE = 'https://s3.amazonaws.com/kindhealth/IconLC.png';
        const speechOutput = 'I just sent your phone number over to kind health a representative will contact you shortly.';
        const reachOut = 'Thanks for reaching out to us at KindHealth';
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'commandingechos@gmail.com',
            pass: 'Gamecenter#1'
            }
          });

        var mailOptions = {
            from: 'commandingechos@gmail.com',
              to: 'commandingechos@gmail.com',
         subject: 'Client request for information from Alexa',
            text: 'An individual from'+" "+ itemName +" "+ 'has requested to talk to you about HealthCare Coverage.'
          };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
          }
        });
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .withStandardCard(reachOut, speechOutput, SMALLIMAGE, LARGEIMAGE)
            .getResponse();
    } else {
       const responseBuilder = handlerInput.responseBuilder;
          
          const SMALLIMAGE = 'https://s3.amazonaws.com/kindhealth/IconSC.png'; 
          const LARGEIMAGE = 'https://s3.amazonaws.com/kindhealth/IconLC.png';
          const speechOutput = "Sorry, I didn't get the number please try again!";
          const reprompt = "Please try again, I didn't get the number.";
          
          return responseBuilder
              .speak(speechOutput)
              .reprompt(reprompt)
              .withStandardCard(SKILL_NAME, speechOutput, SMALLIMAGE, LARGEIMAGE)
              .getResponse();
      
    }
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
      || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent');
  },
  handle(handlerInput) {
    const randomIntro = cookbook.getRandomItem(helpings);
    const cardTitle = "How can we help!";
    const speechOutput = randomIntro;
    const reprompt = HELP_REPROMPT;
    const cardText = 'Phone: 1 (888) 871-3864 \nEmail: hello@getkindhealth.com \nWebsite:\nhttps://www.kindhealth.co \nTwitter: @KINDCares \nYoutube: Kindhealth \nAddress: \n1409 W 3rd St Austin, TX 78703';
    const SMALLIMAGE = 'https://s3.amazonaws.com/kindhealth/IconSC.png'; 
    const LARGEIMAGE = 'https://s3.amazonaws.com/kindhealth/IconLC.png';

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(reprompt)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent' 
        || handlerInput.requestEnvelope.request.intent.name === 'noIntent');
  },
  handle(handlerInput) {
    const randomClosing = cookbook.getRandomItem(closings);
    const cardTitle = "We hope to see you soon!";
    const speechOutput = randomClosing;
    const stopmessage = 'Phone: 1 (888) 871-3864 \n Email: hello@getkindhealth.com \n  Twitter: @KINDCares \nYoutube: Kindhealth\n Website:\n https://www.kindhealth.co'; 
    const SMALLIMAGE = 'https://s3.amazonaws.com/kindhealth/IconSC.png'; 
    const LARGEIMAGE = 'https://s3.amazonaws.com/kindhealth/IconLC.png';
    
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withStandardCard(cardTitle, stopmessage, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const FallbackHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(FALLBACK_MESSAGE)
      .reprompt(FALLBACK_REPROMPT)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I didn\'t get that please try again!')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

function getAnswersBySubject(sub) {
    const list = [];
    for (let i = 0; i < healthCareStats.information.length; i += 1) {
        if (healthCareStats.information[i].subject.search(sub) > -1) {
            list.push(healthCareStats.information[i]);
        }
    }
    return list;
}

function getAnswersByVideoSubject(sub) {
    const list = [];
    for (let i = 0; i < healthCareVideos.information.length; i += 1) {
        if (healthCareVideos.information[i].subject.search(sub) > -1) {
            list.push(healthCareVideos.information[i]);
        }
    }
    return list;
}

function randomArrayElement(array) {
    let i = 0;
    i = Math.floor(Math.random() * array.length);
    return (array[i]);
}

///////////////////////
function supportsDisplay() {
  var hasDisplay =
    this.event.context &&
    this.event.context.System &&
    this.event.context.System.device &&
    this.event.context.System.device.supportedInterfaces &&
    this.event.context.System.device.supportedInterfaces.Display;

  return hasDisplay;
}

function isSimulator() {
  var isSimulator = !this.event.context;
  return isSimulator;
}

///////////////////////

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    faqHandler,
    customerServiceHandler,
    avIntentHandler,
    lostCardHandler,
    HelpIntentHandler,
    FallbackHandler,
    callHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
