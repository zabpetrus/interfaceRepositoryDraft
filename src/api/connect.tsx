import store from "../contexts/MainContext";
import { Desvios } from "../types/_desvios";
import { Fases } from "../types/_fases";


export const handleLoadFile = async( event: any ) => {
      try{
    const response = await fetch("assets/data.json", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: { "Content-Type": "application/json" },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    const data : any = await response.json();  
    if( data.fases === undefined || data.desvios === undefined) { throw new Error("Indefinido"); }
    const p = phaseMapping(data.fases);  
    const d = detourMapping(data.desvios);

    store.dispatch({ type: 'LOAD_DATA_FASE', payload: p });

    store.dispatch({ type: 'LOAD_DATA_DESVIO', payload: d });

    store.dispatch({ type: 'FASE_NUMPHASES', payload: p });

    store.dispatch({ type: 'DETOUR_NUMDETOURS', payload: d });


    }catch(err){
        console.log(err);
    }
}

const phaseMapping = (arraydefases: any[]) : Fases[] => {

    const fase_mapa = new Map();
     arraydefases.forEach((item) => {
       const fase: Fases = {
         'id': item.id,
         'od': item.od,
         'nome': item.nome,
         'tipo': item.tipo,
         'dia': item.dia,
         'hanger': item.hanger,
         'sapata': item.sapata,
         'toc': item.toc,
         'mw': item.mw,
       };
       fase_mapa.set(fase.id, fase);
   });

   //Transformar o mapeameto em uma lista de objetos
   const phaseArray : Fases[] = Array.from(fase_mapa.values());
   return phaseArray;
 }


 const detourMapping = (arraydedesvios: any[]) : Desvios[] => {
    const desvio_mapa = new Map();
    arraydedesvios.forEach((item) => {
       const desvios: Desvios = {
         'id': item.id,
         'L': item.L,
         'radio': item.radio,
         'teta': item.teta,
         'azimut': item.azimut,       
       };
       desvio_mapa.set(desvios.id, desvios);
   });

   //Transforma o map em um tipo Lista
   const detourobject : Desvios[] = Array.from(desvio_mapa.values());;
   return detourobject;
 }
 
 