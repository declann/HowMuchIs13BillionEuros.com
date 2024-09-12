// Here are the formulas to calculate numbers
// Made with calculang: a language for structure, flexibility, communication and transparency for numbers.
// See calculang.dev for more info


// formulas:
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

// benchmarks
export const amount_over_national_debt = () => amount() / national_debt()
export const amount_over_total_expenditure_2023 = () => amount() / total_expenditure_2023()

// "hardcodes" : but you can change them
export const population = () => 5_149_139; // population of ROI from census: https://www.cso.ie/en/releasesandpublications/ep/p-cpsr/censusofpopulation2022-summaryresults/keyfindings/#:~:text=There%20were%205%2C149%2C139%20people%20in,a%2063%25%20increase%20from%202016.
export const national_debt = () => 201_970_000_000 // https://www.ntma.ie/uploads/general/Composition-of-Debt-Aug-2024-excel-download.xlsx
export const total_expenditure_2023 = () => 102_500_000_000 // https://whereyourmoneygoes.gov.ie/en/2023/
export const primary_school_enrolments = () => 558_143 // primary_school_enrolments_in// 558_143 // at census time 30 September 2022, https://assets.gov.ie/263000/f2932136-6191-4e56-9af0-5b315e85702f.pdf

// inputs:

// the amount we are interested in
export const amount = () => amount_in;

// costs
export const tablet_cost = () => tablet_cost_in;
export const one_off_gift_cost = () => one_off_gift_cost_in
export const oasis_tickets_cost = () => oasis_tickets_cost_in // 347 "average" by aib https://www.independent.ie/business/irish/oasis-fans-spend-average-of-347-on-tickets-aib/a1872859883.html
export const bike_shed_cost = () => bike_shed_cost_in // 336k: https://www.irishtimes.com/life-style/2024/09/06/its-not-even-a-shed-a-summary-of-the-leinster-house-bike-shelter-controversy/
export const national_childrens_hospital_cost = () => national_childrens_hospital_cost_in // 2_240_000_000 // https://www.irishtimes.com/health/2024/02/13/national-childrens-hospital-cost-rises-to-over-2bn-donnelly-confirms/
export const special_needs_assistant_cost = () => special_needs_assistant_cost_in // 34472 // pa, middle of range for a starter
export const heat_pump_grant_cost = () => heat_pump_grant_cost_in // 6500 https://www.seai.ie/grants/home-energy-grants/individual-grants/heat-pump-systems/
export const house_cost = () => house_cost_in

// other
export const croke_park_capacity = () => croke_park_capacity_in; // 82.3k https://crokepark.ie/stadium/about
export const house_occupants = () => house_occupants_in // 2.74; // CSO "In 2022, there were on average 2.74 people per private household" https://www.cso.ie/en/releasesandpublications/ep/p-cpsr/censusofpopulation2022-summaryresults/householdsizeandmaritalstatus/
export const bikes_per_bike_shed = () => bikes_per_bike_shed_in; // 18 ""
