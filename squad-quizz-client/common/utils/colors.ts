type getColorProps<statusType extends string> = {
    status: statusType;
    reference: { [key in statusType]: string};
}

export const getColor = <statusType extends string>({status, reference}: getColorProps<statusType>) => {
    return reference[status]
}