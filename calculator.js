/**
 *  * Calculation Logic Module
  */

  /**
   * Calculate Tax based on Ethiopian Progressive Tax Rules
    * @param {number} taxableIncome
     * @returns {number}
      */
      export function calculateTax(taxableIncome) {
          if (taxableIncome <= 2000) return 0;
              if (taxableIncome <= 4000) return (taxableIncome * 0.15) - 300;
                  if (taxableIncome <= 7000) return (taxableIncome * 0.20) - 500;
                      if (taxableIncome <= 10000) return (taxableIncome * 0.25) - 850;
                          if (taxableIncome <= 14000) return (taxableIncome * 0.30) - 1250;
                              return (taxableIncome * 0.35) - 2050;
                              }

                              /**
                               * Main Calculation Function
                                * @param {Object} inputs - { flightHours, gdoDays, deductions, settings }
                                 * @returns {Object} calculationResult
                                  */
                                  export function calculateSalary(inputs) {
                                      const { flightHours, gdoDays, deductions, settings } = inputs;
                                          
                                              // Extract settings with defaults if needed
                                                  const basicSalary = parseFloat(settings.basicSalary) || 0;
                                                      const allowance = parseFloat(settings.allowance) || 0;
                                                          const usdRate = parseFloat(settings.usdRate) || 8;
                                                              const exchangeRate = parseFloat(settings.exchangeRate) || 1;
                                                                  const overtimeMultiplier = parseFloat(settings.overtimeMultiplier) || 1.65;
                                                                      const gdoMultiplier = parseFloat(settings.gdoMultiplier) || 2;

                                                                          // 1. Flight Pay
                                                                              // flightPay = flightHours × usdRate × exchangeRate
                                                                                  const flightPay = (parseFloat(flightHours) || 0) * usdRate * exchangeRate;

                                                                                      // 2. Overtime
                                                                                          // Overtime applies only when flightHours > 80
                                                                                              const hours = parseFloat(flightHours) || 0;
                                                                                                  const overtimeHours = Math.max(0, hours - 80);
                                                                                                      
                                                                                                          // overtimeRate = (basicSalary ÷ 80) × overtimeMultiplier
                                                                                                              const overtimeRate = (basicSalary / 80) * overtimeMultiplier;
                                                                                                                  const overtimePay = overtimeHours * overtimeRate;

                                                                                                                      // 3. GDO Payment
                                                                                                                          // gdoRate = (basicSalary ÷ 80) × gdoMultiplier
                                                                                                                              const gdoRate = (basicSalary / 80) * gdoMultiplier;
                                                                                                                                  const gdoPay = (parseFloat(gdoDays) || 0) * gdoRate;

                                                                                                                                      // 4. Taxable Income
                                                                                                                                          // taxableIncome = basicSalary + allowance + overtimePay + gdoPay
                                                                                                                                              // (Note: Flight pay is NOT included in taxable income based on specific requirements)
                                                                                                                                                  const taxableIncome = basicSalary + allowance + overtimePay + gdoPay;

                                                                                                                                                      // 5. Tax
                                                                                                                                                          let tax = calculateTax(taxableIncome);
                                                                                                                                                              // Tax cannot be negative
                                                                                                                                                                  if (tax < 0) tax = 0;

                                                                                                                                                                      // 6. Net Salary
                                                                                                                                                                          // netSalary = taxableIncome + flightPay - tax - deductions
                                                                                                                                                                              const netSalary = taxableIncome + flightPay - tax - (parseFloat(deductions) || 0);

                                                                                                                                                                                  return {
                                                                                                                                                                                          flightHours: hours,
                                                                                                                                                                                                  gdoDays: parseFloat(gdoDays) || 0,
                                                                                                                                                                                                          deductions: parseFloat(deductions) || 0,
                                                                                                                                                                                                                  flightPay,
                                                                                                                                                                                                                          overtimeHours,
                                                                                                                                                                                                                                  overtimeRate,
                                                                                                                                                                                                                                          overtimePay,
                                                                                                                                                                                                                                                  gdoRate,
                                                                                                                                                                                                                                                          gdoPay,
                                                                                                                                                                                                                                                                  taxableIncome,
                                                                                                                                                                                                                                                                          taxAmount: tax,
                                                                                                                                                                                                                                                                                  netSalary
                                                                                                                                                                                                                                                                                      };
                                                                                                                                                                                                                                                                                      }
 */