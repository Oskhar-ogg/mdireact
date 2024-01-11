import { Dimensions } from "react-native"

const screenHeight = Dimensions.get('screen').height
const screenWidth = Dimensions.get('screen').width

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#022534',
    },
    appName: {
        color : 'white' ,
        fontSize:18,
    },

    TopContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    imageContainer:{
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        flex :0.67,
        width: 355,
        height: 225,
        borderRadius: 17,
        borderWidth: 1,
        overflow: 'hidden',
        borderColor: 'fff',
        resizeMode: 'cover',
    },

    BottomContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    Text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    Text2: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    TextCard:{
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'top',
    },

    TextCardBottom: {
        color: 'green',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign:'center',
        textAlignVertical:'bottom',
    },

    TextCardBottom2: {
        color: 'orange',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'bottom',
      },

      textContainer: {
        position: 'relative',
        bottom: '0%',
        left: 0,
        right: 0,
        padding: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
      },
      
      bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#08546c',
        height: 50,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      },
      

    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

    buttonInit:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 3, // Ancho del borde
        borderColor: '#000000', //
      },

    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
      },

    roundButton1: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: '#033342',
        borderColor: '#fff',
        borderWidth: 2,
      },

    CenterContainer: {
        flex: screenWidth * 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

      Inventario: {
        flex: screenWidth * 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },

    Card: {
        width: screenWidth * 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#033342',
        borderRadius: 10,
        marginBottom: 50,
      },

    Cardinit: {
        width: screenWidth * 1,
        height: screenHeight * 1,
        margin: 500,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderColor: '#022534',
        borderWidth: 50,
      },

    input: {
        borderWidth: 0.2,
        borderColor: 'grey',        
        borderRadius: 10,
        padding: 10,
        fontSize: 18,
        width: screenWidth * 0.8,
        margin: 10,
      },

    OptionsContainer: {
        flex: 1,
        width: screenWidth * 1,
        alignItems: 'left',
        backgroundColor: '#ffffff',
      },

      FlatList: {
        marginBottom: 50,

      AgendaList:{
        backgroundColor: '#08546c',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17

      },
      CitaList:{
        backgroundColor: '#022534',
        flex: 1,
        padding: 5,},
        
      emptyDate:{
        height: 15,
        flex: 1,
        paddingTop: 30
      },

      addList:{        
      backgroundColor: '#022534',
      flex: 1,
      padding: 5,
      margin: 10,
      },
      
      LoginContainer: {
        flex: screenWidth * 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
        marginBottom: 50,
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },

    },
  }

export default styles