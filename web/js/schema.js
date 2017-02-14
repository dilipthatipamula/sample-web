var schemaDefs = {
    "tasks": {
        "idField": "id",
        "fields": [{
            "field": "type",
            "label": "Name",
            "type": "field",
            "sortable": false
        }, {
            "field": "status",
            "label": "Status",
            "type": "field",
            "sortable": false
        }, {
            "field": "duedate",
            "label": "Queued Date",
            "type": "date",
            "dateFormat": "MM/dd/yyyy hh:mm:ss",
            "sortable": false
        }, {
            "field": "startdate",
            "label": "Start Date",
            "type": "date",
            "dateFormat": "MM/dd/yyyy hh:mm:ss",
            "sortable": false,
        }, {
            "field": "enddate",
            "label": "Complete Date",
            "type": "date",
            "dateFormat": "MM/dd/yyyy hh:mm:ss",
            "sortable": false,
        }, {
            "field": "timeTaken",
            "label": "Time Taken(HH:MM:SS)",
            "type": "field",
            "sortable": false
        }, {
            "field": "message",
            "label": "Message",
            "type": "field",
            "sortable": false
        }]
    },
    "templates": {
        "idField": "id",
        "fields": [{
            "field": "name",
            "label": "Name",
            "type": "field",
            "sortable": false
        }, {
            "field": "type",
            "label": "Format",
            "type": "field",
            "sortable": false
        }, {
            "field": "createdAt",
            "label": "Created At",
            "type": "date",
            "dateFormat": "MM/dd/yyyy",
            "sortable": false
        }, {
            "field": "updatedAt",
            "label": "Updated At",
            "type": "date",
            "dateFormat": "MM/dd/yyyy",
            "sortable": false
        }, {
            "field": "",
            "label": "",
            "type": "actions",
            "actionType": "custom",
            "sortable": false,
            "templateURL": "template-actions-url",
            "style": "left",
            "actions": []
        }]
    },
    "schedules": {
        "idField": "id",
        "fields": [{
            "field": "priority",
            "label": "Priority",
            "type": "field",
            "sortable": false
        }, {
            "field": "msgType",
            "label": "Message Type",
            "type": "field",
            "sortable": false
        }, {
            "field": "criteria.ACCOUNT_NUMBER",
            "label": "Counterparty",
            "type": "format",
            "sortable": false
        }, {
            "field": "templateName",
            "label": "Template",
            "type": "field",
            "sortable": false
        }, {
            "field": "timeline.type",
            "label": "Timeline",
            "type": "format",
            "sortable": false
        }, {
            "field": "delivery.mode",
            "label": "Transmission Mode",
            "type": "format",
            "sortable": false
        }, {
            "field": "",
            "label": "",
            "type": "actions",
            "actionType": "custom",
            "sortable": false,
            "templateURL": "schedule-actions-url",
            "style": "left",
            "actions": []
        }]
    },
    "ftps": {
        "idField": "id",
        "fields": [{
            "field": "name",
            "label": "FTP Name",
            "type": "field",
            "sortable": false
        }, {
            "field": "user",
            "label": "User Name",
            "type": "field",
            "sortable": false
        }, {
            "field": "ACCOUNT_NUMBER",
            "label": "Account Number",
            "type": "field",
            "sortable": false
        }, {
            "field": "ip",
            "label": "IP Address",
            "type": "field",
            "sortable": false
        }, {
            "field": "dir",
            "label": "Directory",
            "type": "field",
            "sortable": false
        }, {
            "field": "",
            "label": "",
            "type": "actions",
            "actionType": "custom",
            "sortable": false,
            "templateURL": "ftps-actions-url",
            "style": "left",
            "actions": []
        }]
    },
    "STMT": {
      "fields": [{
          "label": "Client Name",
          "key": "CLIENT_NAME",
          "type": "string"
      },{
          "label": "Client Account",
          "key": "CLIENT_ACCOUNT_NAME",
          "type": "string"
      },{
          "label": "Trade Reference",
          "key": "TRADE_REF",
          "type": "string"
      },{
          "label": "Account Number",
          "key": "ACCOUNT_NUMBER",
          "type": "string"
      },{
          "label": "Trade Type",
          "key": "TRADE_TYPE",
          "type": "string"
      },{
          "label": "Company",
          "key": "COMPANY",
          "type": "string"
      },{
          "label": "Operation",
          "key": "OPER",
          "type": "string"
      },{
          "label": "Quantity",
          "key": "QUANTITY",
          "type": "string"
      },{
          "label": "Instrument Name",
          "key": "INSTR_NAME",
          "type": "string"
      },{
          "label": "Instrument Reference Type",
          "key": "INSTR_REF_TYPE",
          "type": "string"
      },{
          "label": "Instrument Reference",
          "key": "INSTR_REF",
          "type": "string"
      },{
          "label": "Maturity Date",
          "key": "MATURITY_DATE",
          "type": "date"
      },{
          "label": "Trade Date",
          "key": "TRADE_DATE",
          "type": "date"
      },{
          "label": "Settlement Date",
          "key": "SETTLE_DATE",
          "type": "date"
      },{
          "label": "Trade Price",
          "key": "TRADE_PRICE",
          "type": "string"
      },{
          "label": "Trade Principal",
          "key": "TRADE_PRINCIPAL",
          "type": "string"
      },{
          "label": "Trade Currency",
          "key": "TRADE_CCY",
          "type": "string"
      },{
          "label": "Accrued Interest",
          "key": "ACCRUED_INTEREST",
          "type": "string"
      },{
          "label": "Accrued Interest Currency",
          "key": "ACCRUED_INTEREST_CCY",
          "type": "string"
      },{
          "label": "Accrued Interest Days",
          "key": "ACCRUED_INTEREST_DAYS",
          "type": "string"
      },{
          "label": "Place of Trade",
          "key": "PLACE_OF_TRADE",
          "type": "string"
      },{
          "label": "Transfer Type",
          "key": "TRANSFER_TYPE",
          "type": "string"
      },{
          "label": "Broker Fee",
          "key": "BROKER_FEE",
          "type": "string"
      },{
          "label": "Clearing Fee",
          "key": "CLEARING_FEE",
          "type": "string"
      },{
          "label": "Exchange Fee",
          "key": "EXCHANGE_FEE",
          "type": "string"
      },{
          "label": "SEC Fee",
          "key": "SEC_FEE",
          "type": "string"
      },{
          "label": "Commission",
          "key": "COMMISSION",
          "type": "string"
      },{
          "label": "CONS_TAX",
          "key": "Consumption Tax",
          "type": "string"
      },{
          "label": "STT Fee",
          "key": "STT_FEE",
          "type": "date"
      },{
          "label": "Net Broker Fee",
          "key": "NET_BROKER_FEE",
          "type": "string"
      },{
          "label": "Net Clearing Fee",
          "key": "NET_CLEARING_FEE",
          "type": "string"
      },{
          "label": "Net Exchange Fee",
          "key": "NET_EXCHANGE_FEE",
          "type": "string"
      },{
          "label": "Net SEC Fee",
          "key": "NET_SEC_FEE",
          "type": "string"
      },{
          "label": "Net Commission",
          "key": "NET_COMMISSION",
          "type": "string"
      },{
          "label": "Net Consumption Tax",
          "key": "NET_CONS_TAX",
          "type": "date"
      },{
          "label": "Net STT Fee",
          "key": "NET_STT_FEE",
          "type": "string"
      },{
          "label": "Net Settlement Amount",
          "key": "NET_SETTLE_AMT",
          "type": "string"
      },{
          "label": "Settlement Amount",
          "key": "SETTLE_AMT",
          "type": "string"
      },{
          "label": "Settlement Currency",
          "key": "SETTLE_CCY",
          "type": "string"
      },{
          "label": "Settlement Type",
          "key": "SETTLE_TYPE",
          "type": "string"
      },{
          "label": "Company Bank Account Name",
          "key": "COMP_BANK_ACC_NAME",
          "type": "string"
      },{
          "label": "Counterparty Bank Account Name",
          "key": "CPTY_BANK_ACC_NAME",
          "type": "string"
      },{
          "label": "Counterparty Bank Account BIC",
          "key": "CPTY_BANK_ACC_BIC",
          "type": "string"
      },{
          "label": "Custody Account Name",
          "key": "CUSTODY_ACC_NAME",
          "type": "string"
      },{
          "label": "Company Name",
          "key": "COMP_NAME",
          "type": "string"
      },{
          "label": "Company Address - Line 1",
          "key": "COMP_ADDR1",
          "type": "string"
      },{
          "label": "Company Address - Line 2",
          "key": "COMP_ADDR2",
          "type": "string"
      },{
          "label": "Company Address - Line 3",
          "key": "COMP_ADDR3",
          "type": "string"
      },{
          "label": "Company Address - City",
          "key": "COMP_CITY",
          "type": "string"
      },{
          "label": "Company Address - State",
          "key": "COMP_STATE",
          "type": "string"
      },{
          "label": "Company Address - Country",
          "key": "COMP_COUNTRY",
          "type": "string"
      },{
          "label": "Company Address - Zip Code",
          "key": "COMP_ZIP",
          "type": "string"
      },{
          "label": "Company E-Mail Id",
          "key": "COMP_EMAIL",
          "type": "string"
      },{
          "label": "Company Fax No",
          "key": "COMP_FAX",
          "type": "string"
      },{
          "label": "Company Address - Telephone No",
          "key": "COMP_PHONE",
          "type": "string"
      },{
          "label": "Company Name",
          "key": "CLIENT_ADDR_NAME",
          "type": "string"
      },{
          "label": "Client Address - Line 1",
          "key": "CLIENT_ADDR1",
          "type": "string"
      },{
          "label": "Client Address - Line 2",
          "key": "CLIENT_ADDR2",
          "type": "string"
      },{
          "label": "Client Address - Line 3",
          "key": "CLIENT_ADDR3",
          "type": "string"
      },{
          "label": "Client Address - City",
          "key": "CLIENT_CITY",
          "type": "string"
      },{
          "label": "Client Address - State",
          "key": "CLIENT_STATE",
          "type": "string"
      },{
          "label": "Client Address - Country",
          "key": "CLIENT_COUNTRY",
          "type": "string"
      },{
          "label": "Client Address - Zip Code",
          "key": "CLIENT_ZIP",
          "type": "string"
      },{
          "label": "Client E-Mail Id",
          "key": "CLIENT_EMAIL",
          "type": "string"
      },{
          "label": "Client Fax No",
          "key": "CLIENT_FAX",
          "type": "string"
      },{
          "label": "Client Address - Telephone No",
          "key": "CLIENT_PHONE",
          "type": "string"
      },{
          "label": "Report",
          "key": "PDF_LINK",
          "type": "link"
      },{
          "label": "Client Address - State",
          "key": "CLIENT_STATE",
          "type": "string"
      },{
          "label": "Client Address - Country",
          "key": "CLIENT_COUNTRY",
          "type": "string"
      },{
          "label": "Client Address - Zip Code",
          "key": "CLIENT_ZIP",
          "type": "string"
      }]
    },
    "TRADE": {
      "fields": [{
          "label": "Client Name",
          "key": "CLIENT_NAME",
          "type": "string"
      },{
          "label": "Client Account",
          "key": "CLIENT_ACCOUNT_NAME",
          "type": "string"
      },{
          "label": "Trade Reference",
          "key": "TRADE_REF",
          "type": "string"
      },{
          "label": "Account Number",
          "key": "ACCOUNT_NUMBER",
          "type": "string"
      },{
          "label": "Trade Type",
          "key": "TRADE_TYPE",
          "type": "string"
      },{
          "label": "Company",
          "key": "COMPANY",
          "type": "string"
      },{
          "label": "Operation",
          "key": "OPER",
          "type": "string"
      },{
          "label": "Quantity",
          "key": "QUANTITY",
          "type": "string"
      },{
          "label": "Instrument Name",
          "key": "INSTR_NAME",
          "type": "string"
      },{
          "label": "Instrument Reference Type",
          "key": "INSTR_REF_TYPE",
          "type": "string"
      },{
          "label": "Instrument Reference",
          "key": "INSTR_REF",
          "type": "string"
      },{
          "label": "Maturity Date",
          "key": "MATURITY_DATE",
          "type": "date"
      },{
          "label": "Trade Date",
          "key": "TRADE_DATE",
          "type": "date"
      },{
          "label": "Settlement Date",
          "key": "SETTLE_DATE",
          "type": "date"
      },{
          "label": "Trade Price",
          "key": "TRADE_PRICE",
          "type": "string"
      },{
          "label": "Trade Principal",
          "key": "TRADE_PRINCIPAL",
          "type": "string"
      },{
          "label": "Trade Currency",
          "key": "TRADE_CCY",
          "type": "string"
      },{
          "label": "Accrued Interest",
          "key": "ACCRUED_INTEREST",
          "type": "string"
      },{
          "label": "Accrued Interest Currency",
          "key": "ACCRUED_INTEREST_CCY",
          "type": "string"
      },{
          "label": "Accrued Interest Days",
          "key": "ACCRUED_INTEREST_DAYS",
          "type": "string"
      },{
          "label": "Place of Trade",
          "key": "PLACE_OF_TRADE",
          "type": "string"
      },{
          "label": "Transfer Type",
          "key": "TRANSFER_TYPE",
          "type": "string"
      },{
          "label": "Broker Fee",
          "key": "BROKER_FEE",
          "type": "string"
      },{
          "label": "Clearing Fee",
          "key": "CLEARING_FEE",
          "type": "string"
      },{
          "label": "Exchange Fee",
          "key": "EXCHANGE_FEE",
          "type": "string"
      },{
          "label": "SEC Fee",
          "key": "SEC_FEE",
          "type": "string"
      },{
          "label": "Commission",
          "key": "COMMISSION",
          "type": "string"
      },{
          "label": "CONS_TAX",
          "key": "Consumption Tax",
          "type": "string"
      },{
          "label": "STT Fee",
          "key": "STT_FEE",
          "type": "date"
      },{
          "label": "Net Broker Fee",
          "key": "NET_BROKER_FEE",
          "type": "string"
      },{
          "label": "Net Clearing Fee",
          "key": "NET_CLEARING_FEE",
          "type": "string"
      },{
          "label": "Net Exchange Fee",
          "key": "NET_EXCHANGE_FEE",
          "type": "string"
      },{
          "label": "Net SEC Fee",
          "key": "NET_SEC_FEE",
          "type": "string"
      },{
          "label": "Net Commission",
          "key": "NET_COMMISSION",
          "type": "string"
      },{
          "label": "Net Consumption Tax",
          "key": "NET_CONS_TAX",
          "type": "date"
      },{
          "label": "Net STT Fee",
          "key": "NET_STT_FEE",
          "type": "string"
      },{
          "label": "Net Settlement Amount",
          "key": "NET_SETTLE_AMT",
          "type": "string"
      },{
          "label": "Settlement Amount",
          "key": "SETTLE_AMT",
          "type": "string"
      },{
          "label": "Settlement Currency",
          "key": "SETTLE_CCY",
          "type": "string"
      },{
          "label": "Settlement Type",
          "key": "SETTLE_TYPE",
          "type": "string"
      },{
          "label": "Company Bank Account Name",
          "key": "COMP_BANK_ACC_NAME",
          "type": "string"
      },{
          "label": "Counterparty Bank Account Name",
          "key": "CPTY_BANK_ACC_NAME",
          "type": "string"
      },{
          "label": "Counterparty Bank Account BIC",
          "key": "CPTY_BANK_ACC_BIC",
          "type": "string"
      },{
          "label": "Custody Account Name",
          "key": "CUSTODY_ACC_NAME",
          "type": "string"
      },{
          "label": "Company Name",
          "key": "COMP_NAME",
          "type": "string"
      },{
          "label": "Company Address - Line 1",
          "key": "COMP_ADDR1",
          "type": "string"
      },{
          "label": "Company Address - Line 2",
          "key": "COMP_ADDR2",
          "type": "string"
      },{
          "label": "Company Address - Line 3",
          "key": "COMP_ADDR3",
          "type": "string"
      },{
          "label": "Company Address - City",
          "key": "COMP_CITY",
          "type": "string"
      },{
          "label": "Company Address - State",
          "key": "COMP_STATE",
          "type": "string"
      },{
          "label": "Company Address - Country",
          "key": "COMP_COUNTRY",
          "type": "string"
      },{
          "label": "Company Address - Zip Code",
          "key": "COMP_ZIP",
          "type": "string"
      },{
          "label": "Company E-Mail Id",
          "key": "COMP_EMAIL",
          "type": "string"
      },{
          "label": "Company Fax No",
          "key": "COMP_FAX",
          "type": "string"
      },{
          "label": "Company Address - Telephone No",
          "key": "COMP_PHONE",
          "type": "string"
      },{
          "label": "Company Name",
          "key": "CLIENT_ADDR_NAME",
          "type": "string"
      },{
          "label": "Client Address - Line 1",
          "key": "CLIENT_ADDR1",
          "type": "string"
      },{
          "label": "Client Address - Line 2",
          "key": "CLIENT_ADDR2",
          "type": "string"
      },{
          "label": "Client Address - Line 3",
          "key": "CLIENT_ADDR3",
          "type": "string"
      },{
          "label": "Client Address - City",
          "key": "CLIENT_CITY",
          "type": "string"
      },{
          "label": "Client Address - State",
          "key": "CLIENT_STATE",
          "type": "string"
      },{
          "label": "Client Address - Country",
          "key": "CLIENT_COUNTRY",
          "type": "string"
      },{
          "label": "Client Address - Zip Code",
          "key": "CLIENT_ZIP",
          "type": "string"
      },{
          "label": "Client E-Mail Id",
          "key": "CLIENT_EMAIL",
          "type": "string"
      },{
          "label": "Client Fax No",
          "key": "CLIENT_FAX",
          "type": "string"
      },{
          "label": "Client Address - Telephone No",
          "key": "CLIENT_PHONE",
          "type": "string"
      },{
          "label": "Report",
          "key": "PDF_LINK",
          "type": "link"
      }]
    }
};
