import React from "react";
import { Link } from "react-router-dom";
import { Box, ListItem, List, Divider } from "@chakra-ui/core";

const AgreementMenu = () => {
  return (
    <Box as="nav" fontSize="xl">
      <List>
        <ListItem>
          <Link to="/">Back to Dashboard</Link>
        </ListItem>
        {/* <ListItem>
          <Link to="/create-household">Create Household</Link>
        </ListItem> */}
        <ListItem>
          <Link to="/agreement/title">Roommate Agreement Information</Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        {/* <ListItem>
          <Link to="/agreement/landlord">Landlord Information</Link>
        </ListItem>
        <ListItem>
          <Link to="/agreement/household">House Information</Link>
        </ListItem> */}
        <ListItem>
          <Link to="/agreement/lease">Lease Dates</Link>
        </ListItem>
        <ListItem>
          <Link to="/agreement/roommates">Roommates</Link>
        </ListItem>
        <ListItem>
          <Link to="/agreement/bills">Bills</Link>
          {/* <List ml={4} styleType="disc">
            <ListItem>
              <Link to="/agreement/bills/rent">Bills: Rent</Link>
            </ListItem>
            <ListItem>
              <Link to="/agreement/bills/deposit">Bills: Security Deposit</Link>
            </ListItem>
            <ListItem>
              <Link to="/agreement/bills/utilities">Bills: Utilities</Link>
            </ListItem>
          </List> */}
        </ListItem>
        <ListItem>
          <Link to="/agreement/housekeeping">Housekeeping</Link>
        </ListItem>
        <ListItem>
          <Link to="/agreement/signatures">Signatures</Link>
        </ListItem>
        {/* <ListItem>
          <Link to="/agreement/preview">Preview</Link>
        </ListItem> */}
      </List>
    </Box>
  );
};

export default AgreementMenu;
