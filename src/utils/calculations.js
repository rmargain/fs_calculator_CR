
    export const ventasMes = (averageUnitsMonth, currentProductPrice) => {
        return averageUnitsMonth * currentProductPrice
    }

    export const ivaAplicable = (iva, fiscalStatus, RfcStatus)=>{
        if(iva === 'No' || fiscalStatus==='Moral'){
            return 0
        } else if (fiscalStatus === 'Fisica' && RfcStatus === 'Si'){
            return 0.08
        } else {
            return 0.16
        }
        }

    export const isrAplicable = (fiscalStatus, RfcStatus) => {
        if(fiscalStatus === 'Moral'){
            return 0
        } else if(fiscalStatus === 'Fisica' && RfcStatus === 'Si'){
            return 0.02
        } else {
            return 0.20
        }
    }

    export const comisionCR = (subscription) => subscription === 'Plus' ? 0.05 : 0.085

    export const pasarelaPagos = 0.035

    export const fsThreshold = 499

    export const envioPromedio = (moto, auto, national) =>{
        return 69 * moto/100 + 99 * auto/100 + 141 * national/100
    }
    
    export const totalEnviosActual = (averageUnitsMonth, averageUnitsOrder) =>{
        return averageUnitsMonth/averageUnitsOrder
    } 

    // const ventasMes = averageUnitsMonth * currentProductPrice
    // const ventasOrden = averageUnitsOrder * currentProductPrice
    
    //revisar si esta formula se puede simplificar mas adelante  
    //const ventasMesSinIva = ventasMes/(1+ivaAplicable(iva, fiscalStatus, RfcStatus))
    //const ventasOrdenSinIva = ventasOrden/(1+ivaAplicable(iva, fiscalStatus, RfcStatus))
    //const currentProductPriceSinIva = currentProductPrice/(1+ivaAplicable(iva, fiscalStatus, RfcStatus))
    

    

    

    

    

    


