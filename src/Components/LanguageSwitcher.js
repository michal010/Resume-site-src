import React, { Component } from 'react';
import ReactFlagsSelect from 'react-flags-select';

class LanguageSwitcher extends Component {
  handleSelect = (countryCode) => {
    this.props.onToggle();
  }

  render() {
    const { language } = this.props;
    
    // Map language to country code
    const selectedCountry = language === 'pl' ? 'PL' : 'GB';

    const containerStyle = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000
    };

    return (
      <div style={containerStyle}>
        <ReactFlagsSelect
          countries={["PL", "GB"]}
          selected={selectedCountry}
          onSelect={this.handleSelect}
          customLabels={{ PL: "Polski", GB: "English" }}
          placeholder="Select Language"
          showSelectedLabel={true}
          showOptionLabel={true}
          selectedSize={14}
          optionsSize={14}
          className="language-selector"
        />
      </div>
    );
  }
}

export default LanguageSwitcher;