# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here


# Ticket 25340
## [DB Model] Add `agentId` to `Agents` table 

Given I'm a Facilities employee
I would like to have a custom id for each agent
So I could request the Shift's Report by using that custom id 

### Priority 

P2 - It's not blocking the ability to generate the report but it's required to improve the user experience of the Facility team by adding a custom id for each Agent. 

### Technical Details

- Create a mutation that adds a new column ('agentId') to the table 'Agents'.
- Column must be 'NOT NULL' with a default value of the current 'id' column (the internal database id of the Agent). 
- Column must be 'UNIQUE'. 
- Add a new index to the 'agentId' column.

### Effort 

- 1 Story Point. 
Due to the velocity of the team, we consider this ticket can be finished in 1 working day. 

### Acceptance Criteria

- The 'Agents' table now has an 'agentId' column. 
- Each Agent record has an 'agentId' value that it's unique. 
- We can query the Agent data using the 'agentId' column. 

================================================================

# Ticket 25341
## [Agent] Update 'Agent' resource to allow 'agentId' changes   

Given I'm a Facilities employee
I would like to have a way to check/modify the 'agentId' value
So I could update the agent id with a custom value

### Priority 

P2 - It's not blocking the ability to generate the report but it's required to improve the user experience of the Facility team by adding a custom id for each Agent. 

**Blocked by Ticket 25340**

### Technical Details

- Add the new 'agentId' property to the following endpoints response:
  - GET /agents
  - GET /agents/:id endpoints 
- Update PATCH /agents/:id to allow 'agentId' property to be sent in the body. This endpoint should update the 'agentId' value in the `Agent` table. 

### Effort 

- 2 Story Point. 
Due to the velocity of the team, we consider this ticket can be finished in 3 working day. 

### Acceptance Criteria

- GET /agents/:id must include the 'agentId' property. 
- POST /agents/:id with an 'agentId' value in the body should update the 'Agent' record. 

================================================================

# Ticket 25342
## [Reports] Update 'getShiftsByAgentId' function

Given I'm a Facilities employee
I would like to use the new 'agentId' value
So I could check the shifts by agent id
### Priority 

P2 - It's not blocking the ability to generate the report but it's required to improve the reports. 

**Blocked by Ticket 25340**

### Technical Details

- Update the 'getShiftsByAgentId' function to receive 'agentId' as a parameter.
- Update the query/relationship to use the 'agentId' value instead of the 'id' value. This will allow us to get the shifts of the Agent from the database by using the new custom id.

### Effort 

- 3 Story Point. 
Due to the velocity of the team, we consider this ticket can be finished in 5 working day. 

### Acceptance Criteria

- I can send the new 'agentId' value to the 'getShiftsByAgentId' function.
- I get a list of Shifts for the Agent with the new 'agentId' value.


================================================================

# Ticket 25343
## [Reports] Update 'generateReport' function

Given I'm a Facilities employee
I would like to use the new 'agentId' value
So I could generate a report of the shifts by agent id
### Priority 

P2 - It's not blocking the ability to generate the report but it's required to improve the reports. 

**Blocked by Ticket 25342**

### Technical Details

- Update the 'generateReport' function to receive 'agentId' as a parameter.
- Update the call to the `getShiftsByAgentId` function to send the 'agentId' value. This will allow us to generate the report using the new custom id.

### Effort 

- 2 Story Point. 
Due to the velocity of the team, we consider this ticket can be finished in 3 working day. 

### Acceptance Criteria

- I can send the new 'agentId' value to the 'generateReport' function.
- A report is generated using the new 'agentId' value.
