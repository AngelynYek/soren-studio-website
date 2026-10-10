import React from 'react';

export default function DeliveryFields({ disabled }) {
  return (
    <fieldset className="checkout-fields" disabled={disabled}>
      <legend className="visually-hidden">Contact and delivery details</legend>
      <section className="checkout-section" aria-labelledby="contact-heading">
        <h2 id="contact-heading">
          <span>01</span> Contact
        </h2>
        <label className="checkout-field">
          Email address
          <input
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="off"
            placeholder="alex@example.com"
          />
        </label>
        <p className="checkout-field-note">
          Use sample details. Information entered here is not sent or saved.
        </p>
      </section>
      <section className="checkout-section" aria-labelledby="delivery-heading">
        <h2 id="delivery-heading">
          <span>02</span> Delivery
        </h2>
        <div className="checkout-field-grid">
          <label className="checkout-field">
            First name
            <input
              name="firstName"
              required
              maxLength={80}
              pattern=".*\S.*"
              autoComplete="off"
              placeholder="Alex"
            />
          </label>
          <label className="checkout-field">
            Last name
            <input
              name="lastName"
              required
              maxLength={80}
              pattern=".*\S.*"
              autoComplete="off"
              placeholder="Morgan"
            />
          </label>
          <label className="checkout-field checkout-field-wide">
            Address
            <input
              name="address"
              required
              maxLength={160}
              pattern=".*\S.*"
              autoComplete="off"
              placeholder="12 Jalan Example"
            />
          </label>
          <label className="checkout-field checkout-field-wide">
            Apartment, suite, etc. <span className="checkout-optional">(optional)</span>
            <input name="apartment" maxLength={100} autoComplete="off" placeholder="Unit 3A" />
          </label>
          <label className="checkout-field">
            City
            <input
              name="city"
              required
              maxLength={80}
              pattern=".*\S.*"
              autoComplete="off"
              placeholder="Kuala Lumpur"
            />
          </label>
          <label className="checkout-field">
            Postcode
            <input
              name="postcode"
              required
              inputMode="numeric"
              pattern="[0-9]{5}"
              maxLength={5}
              autoComplete="off"
              placeholder="50000"
              title="Enter a five-digit Malaysian postcode."
            />
          </label>
          <label className="checkout-field">
            State / territory
            <select name="state" required defaultValue="">
              <option value="" disabled>
                Select a state
              </option>
              {[
                'Johor',
                'Kedah',
                'Kelantan',
                'Kuala Lumpur',
                'Labuan',
                'Melaka',
                'Negeri Sembilan',
                'Pahang',
                'Penang',
                'Perak',
                'Perlis',
                'Putrajaya',
                'Sabah',
                'Sarawak',
                'Selangor',
                'Terengganu',
              ].map((state) => (
                <option key={state}>{state}</option>
              ))}
            </select>
          </label>
          <label className="checkout-field">
            Country / region
            <input name="country" value="Malaysia" readOnly />
          </label>
        </div>
        <div className="checkout-delivery-option">
          <span>Standard delivery</span>
          <span>Complimentary</span>
        </div>
      </section>
    </fieldset>
  );
}
