export const LUGGAGE_TYPES = [
  {
    icon: "🎒",
    name: "Personal Item",
    maxWeightLbs: 15,
    description: "A small bag that fits under the seat in front of you.",
    allowedInBasicEconomy: true,
    allowedInPremiumEconomy: true,
    allowedInBusiness: true,
    allowedInFirst: true,
    // Weight and bag limits are the same across all cabin classes for personal items
    weightLimits: {
      'basic-economy': 15,
      'premium-economy': 15,
      'business': 15,
      'first': 15
    },
    bagLimits: {
      'basic-economy': 1,
      'premium-economy': 1,
      'business': 1,
      'first': 1
    }
  },
  {
    icon: "💼",
    name: "Carry-On",
    maxWeightLbs: 22,
    description: "A larger bag that fits in the overhead bin.",
    allowedInBasicEconomy: true,
    allowedInPremiumEconomy: true,
    allowedInBusiness: true,
    allowedInFirst: true,
    // Weight and bag limits are the same across all cabin classes for carry-on
    weightLimits: {
      'basic-economy': 22,
      'premium-economy': 22,
      'business': 22,
      'first': 22
    },
    bagLimits: {
      'basic-economy': 1,
      'premium-economy': 1,
      'business': 1,
      'first': 1
    }
  },
  {
    icon: "🧳",
    name: "Checked Bag",
    maxWeightLbs: 50,
    description: "A bag that is checked at the gate and stored in the cargo hold.",
    allowedInBasicEconomy: false,
    allowedInPremiumEconomy: true,
    allowedInBusiness: true,
    allowedInFirst: true,
    // Different weight and bag limits for checked bags based on cabin class
    weightLimits: {
      'basic-economy': 0, // Not allowed
      'premium-economy': 50,
      'business': 70,
      'first': 70
    },
    bagLimits: {
      'basic-economy': 0, // Not allowed
      'premium-economy': 1,
      'business': 2,
      'first': 2
    }
  },
];