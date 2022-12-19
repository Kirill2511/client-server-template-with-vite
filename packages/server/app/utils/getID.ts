import sID, { sessionStore } from "./../../index";

export const getID = () => {
    console.log(sID, 'SID');
    const id = sID.sid;
    const sess = sessionStore.get(id, (err: any) => {
        console.log("ERROR", err);
    });
    console.log(sess);
    return 1;
    // return store.get(sID, function(err: any) {
    //     console.log(err);
    // })
}
