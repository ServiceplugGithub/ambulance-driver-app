import * as Location from 'expo-location';


//fetch location using expo location package and return
export async function getLocation() {
    // Request permission to access the location
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
  
    try {
      // Get the current location
      const location:any = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High, // or Location.Accuracy.Balanced
      });
      return location;
  } catch(error){
        console.log("Error fetching location ")
  }
}


//we don't need gmap api for now , only need coordinates
// export async function getAddressFromLocation(location:any) {
//     const gMapApiKey = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;
//     var lat = parseFloat(location.coords.latitude);
//     var long = parseFloat(location.coords.longitude);
//     const response = await fetch(
//         'https://maps.googleapis.com/maps/api/geocode/json?address=' +
//           lat +
//           ',' +
//           long +
//           '&key=' +
//           gMapApiKey,
//       );


//       const responseJson = await response.json();
//       const responseResult = responseJson.results || [{}];
//       const addrCompnent = responseResult[0]?.address_components || [];
//       const state = _.find(addrCompnent, comp =>
//         _.includes(comp.types, 'administrative_area_level_1'),
//       )?.long_name;
//       const city = _.find(addrCompnent, comp =>
//         _.includes(comp.types, 'locality'),
//       )?.long_name;
//       const pincode = _.find(addrCompnent, comp =>
//         _.includes(comp.types, 'postal_code'),
//       )?.long_name;
//       const address = responseResult[0]?.formatted_address;
//       const locationData = {
//         state,
//         city,
//         address,
//         pincode,
//       };
  
//       let addr = _.find(addrCompnent, (component = {}) => {
//         if (
//           Array.isArray(component?.types) &&
//           component.types.includes('sublocality')
//         ) {
//           return true;
//         } else {
//           return false;
//         }
//       });
//       if (_.isEmpty(addr)) {
//         addr = addrCompnent.find((component:any = {}) => {
//           if (
//             Array.isArray(component?.types) &&
//             component.types.includes('locality')
//           ) {
//             return true;
//           } else {
//             return false;
//           }
//         });
//       }

//       return {
//         locationName : addr?.long_name,
//         subLocationName : responseResult[0].formatted_address
//       }
// }