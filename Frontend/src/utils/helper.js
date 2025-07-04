import moment from "moment";

export const validateEmail=(email)=>{
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
};

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.trim().split(/\s+/); // split by space(s)

    let initials = words[0][0]; // always take first letter of first word

    if (words.length > 1) {
        initials += words[1][0]; // add first letter of second word if exists
    }

    return initials.toUpperCase();
};

export  const addThousandsSeparator=(num)=>{
if(num==null || isNaN(num)) return"";

const [inteferPart,fractionalPart]=num.toString().split(".");
const formattedInteger= inteferPart.replace(/\B(?=(\d{3})+(?!\d))/g,",")
return fractionalPart
?`${formattedInteger}.${fractionalPart}`
:formattedInteger;
}

export const prepareExpenseBarchartDate=(data=[])=>{
    const chartdata=data.map((item)=>({
        category:item?.category,
        amount:item?.amount,
    }));
    return  chartdata;
}
export const prepareIncomebarchartdata=(data=[])=>{
    const sortData=[...data].sort((a,b)=>new Date(a.date)-new Date(b.date))
    const chartdata=sortData.map((item)=>({
        month:moment(item?.date).format("Do MMM "),
        amount:item?.amount,
        source:item?.source,
}))
    return chartdata;
}
export  const prepareExpenselinechartDate=(data=[])=>{
    const sortdata=[...data].sort((a,b)=>new Date(a.date)-new Date(b.Date))
    const chardata=sortdata.map((item)=>({
         month:moment(item?.date).format("Do MMM "),
        amount:item?.amount,
        category:item?.category,
    }))
    return chardata;
}