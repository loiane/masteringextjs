Role('Siesta.Test.AssertionsTranslator', {
    
    has        : {
        translateTo         : { required : true }
    },
    
    
    after : {
        
        addResult : function (result) {
            this.translateTo.addResult(result)
        },
        
        
        failWithException : function () {
            this.translateTo.failWithException.apply(this.translateTo, arguments)
        }
    }
})
