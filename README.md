This Loan Calculator application allows users to calculate monthly EMI (Equated Monthly Installment) based on the loan amount, interest rate, and loan term (in years). The application also includes an amortization schedule to help users understand how their loan will be paid off over time.

The core logic of the app revolves around these key features:

1. Loan EMI Calculation Logic
The function calculateEMI computes both the EMI and the amortization schedule. The amortization schedule breaks down each month's payment into principal and interest parts, with the remaining balance being reduced after each payment.

The calculateEMI function is responsible for calculating the EMI for the loan based on user input and also generates the amortization schedule. This schedule is a detailed list showing the breakdown of each installment, showing how much of the payment goes toward the principal and how much goes toward the interest.

2. Currency Conversion Logic
To support international users, the app converts EMI values and the amortization schedule from the base currency (USD) to the selected currency (e.g., EUR, GBP, INR).

Currency rates are fetched from an external API (exchangerate-api.com) using Axios, which returns a JSON object containing conversion rates for multiple currencies.

The conversion process uses the selected currency’s rate and multiplies the EMI and amortization values accordingly:

The convert function is called whenever we need to display the amount in the chosen currency.

The conversion formula is:

Converted Value
=
Original Value
×
Conversion Rate
Converted Value=Original Value×Conversion Rate
The conversion is applied to both the monthly EMI and each row of the amortization schedule.

3. Dynamic Currency Selection
The app allows users to select the currency they wish to see the loan amounts in. This is achieved using a dropdown menu with options populated from the conversion rates fetched from the API.

Once the user selects a different currency, the app updates the EMI and amortization table to reflect the converted values based on the new currency.

4. Responsive Layout
The UI is designed to be responsive, meaning it adapts its layout based on the screen size. For smaller screens (mobile), the elements are stacked vertically to ensure readability and usability.

On larger screens (tablet or desktop), the UI elements are aligned horizontally. This includes elements like the loan input fields, currency dropdown, and EMI result display.

5. Amortization Table Logic
The amortization table is built dynamically using the results from the EMI calculation. The table displays the following columns:

Month: The month number (1, 2, 3,...).

Principal: The amount of the monthly payment that goes toward reducing the loan principal.

Interest: The portion of the payment that goes toward paying the interest on the loan.

Remaining Balance: The remaining loan balance after each month’s payment.

Each month, the principal portion of the payment increases while the interest portion decreases, which is a standard characteristic of loan amortization. The remaining balance decreases as the principal portion is paid off.

The amortization table is built by iterating over the months and dynamically populating the rows based on the calculation logic.

6. State Management
The state is managed using React hooks like useState to store values such as the loan amount, interest rate, term, result (EMI, schedule), and selected currency.

useContext is used to share global states across different components. For example, the selected currency and the conversion rates are shared using the ThemeContext (or in this case, a currency context).

7. User Interaction
The user interacts with the app through input fields where they enter the loan amount, interest rate, and loan term. When they click the "Calculate" button, the app triggers the EMI calculation logic and displays the result.

If the user clicks "Reset", the form is cleared, and the result is reset.

The selected currency affects the displayed amounts. When the currency is changed, all amounts (EMI and amortization details) are recalculated and displayed in the new currency.

8. Theme Toggle
The application also includes a dark mode/light mode toggle that changes the app’s theme. This feature is managed by the ThemeContext. It uses Material UI's built-in IconButton for toggling the theme between dark and light mode.

The current theme (dark or light) is saved in the context, and the components that use the context automatically update when the theme changes.

9. Error Handling and Loading States
If the conversion rates fail to load (e.g., due to network issues), an error message is displayed to the user. Similarly, while the conversion rates are being fetched, a loading message is shown.

This ensures the app handles external API failures gracefully and provides feedback to the user.
