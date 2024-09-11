
// Here find calculations and assumptions
// I admit I didn't do a lot of science for these
// But at least you can see them, and you can change them!
// calculang is a language for flexibility, communication and transparency about numbers.
// For more about calculang, visit calculang.dev

// the amount we are interested in
export const amount = () => 13_000_000_000;

// assumptions: costs
export const tablet_cost = () => 900;
export const one_off_gift_cost = () => 2000
export const oasis_tickets_cost = () => 347 // "average" by aib https://www.independent.ie/business/irish/oasis-fans-spend-average-of-347-on-tickets-aib/a1872859883.html
export const bike_shed_cost = () => 336000 // https://www.irishtimes.com/life-style/2024/09/06/its-not-even-a-shed-a-summary-of-the-leinster-house-bike-shelter-controversy/
export const national_childrens_hospital_cost = () => 2_240_000_000 // https://www.irishtimes.com/health/2024/02/13/national-childrens-hospital-cost-rises-to-over-2bn-donnelly-confirms/
export const special_needs_assistant_cost = () => 34472 // pa, middle of range for a starter
export const heat_pump_grant_cost = () => 6500 // https://www.seai.ie/grants/home-energy-grants/individual-grants/heat-pump-systems/
export const house_cost = () => 300_000


// assumptions: stats
export const primary_school_enrolments = () => 558_143 // at census time 30 September 2022, https://assets.gov.ie/263000/f2932136-6191-4e56-9af0-5b315e85702f.pdf
// population of Ireland
export const population = () => 5_149_139; // https://www.cso.ie/en/releasesandpublications/ep/p-cpsr/censusofpopulation2022-summaryresults/keyfindings/#:~:text=There%20were%205%2C149%2C139%20people%20in,a%2063%25%20increase%20from%202016.

// assumptions: amounts
export const croke_park_capacity = () => 82_300; // https://crokepark.ie/stadium/about
export const national_debt = () => 201_970_000_000 // https://www.ntma.ie/uploads/general/Composition-of-Debt-Aug-2024-excel-download.xlsx
export const tax_revenue_2023 = () => 88_100_000_000 // https://www.gov.ie/en/press-release/cb77b-exchequer-surplus-of-12-billion-in-2023-tax-revenue-in-line-with-expectations-ministers-mcgrath-donohoe/
export const total_expenditure_2023 = () =>  102_500_000_000 // https://whereyourmoneygoes.gov.ie/en/2023/
export const house_occupants = () => 2.74; // CSO "In 2022, there were on average 2.74 people per private household" https://www.cso.ie/en/releasesandpublications/ep/p-cpsr/censusofpopulation2022-summaryresults/householdsizeandmaritalstatus/
export const bikes_per_bike_shed = () => 18;

// calculations:

export const tablets_per_person = () => amount() / tablet_cost() / population()
export const tablets_per_primary_pupil = () => amount() / tablet_cost() / primary_school_enrolments()
export const one_off_gifts_per_person = () => amount() / one_off_gift_cost() / population();
export const oasis_tickets_per_person = () => amount() / oasis_tickets_cost() / population();
export const oasis_gigs = () => oasis_tickets_per_person() * population() / croke_park_capacity()

export const bike_sheds = () => amount() / bike_shed_cost()
export const bike_shed_bikes = () => bike_sheds() * bikes_per_bike_shed()
export const national_childrens_hospitals = () => amount() / national_childrens_hospital_cost()
export const special_needs_assistants_years = () => amount() / special_needs_assistant_cost()

export const heat_pump_grants = () => amount() / heat_pump_grant_cost()

export const houses = () => amount() / house_cost()
export const house_pc = () => houses() * house_occupants() / population()

// proportions:

export const amount_over_national_debt = () => amount() / national_debt()
export const amount_over_tax_revenue_2023 = () => amount() / tax_revenue_2023()
export const amount_over_total_expenditure_2023 = () => amount() / total_expenditure_2023()
