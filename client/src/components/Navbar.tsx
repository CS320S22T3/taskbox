import React from "react";

interface NavbarParameters {
  onSubmit: () => void;
}

class Navbar extends React.Component<NavbarParameters> {
  constructor(props: NavbarParameters) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event: React.ChangeEvent<HTMLFormElement>) {
    if (this.props.onSubmit != null) this.props.onSubmit();
    event.preventDefault();
  }

  render() {
    return (
      <nav>
        <button>Log Out</button>
      </nav>
    );
  }
}

export default Navbar;
