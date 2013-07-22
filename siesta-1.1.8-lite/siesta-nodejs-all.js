/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
;!function () {;
var Joose = {}

// configuration hash

Joose.C             = typeof JOOSE_CFG != 'undefined' ? JOOSE_CFG : {}

Joose.is_IE         = '\v' == 'v'
Joose.is_NodeJS     = Boolean(typeof process != 'undefined' && process.pid)


Joose.top           = Joose.is_NodeJS && global || this

Joose.stub          = function () {
    return function () { throw new Error("Modules can not be instantiated") }
}


Joose.VERSION       = ({ /*PKGVERSION*/VERSION : '3.50.1' }).VERSION


if (typeof module != 'undefined') module.exports = Joose
/*if (!Joose.is_NodeJS) */
this.Joose = Joose


// Static helpers for Arrays
Joose.A = {

    each : function (array, func, scope) {
        scope = scope || this
        
        for (var i = 0, len = array.length; i < len; i++) 
            if (func.call(scope, array[i], i) === false) return false
    },
    
    
    eachR : function (array, func, scope) {
        scope = scope || this

        for (var i = array.length - 1; i >= 0; i--) 
            if (func.call(scope, array[i], i) === false) return false
    },
    
    
    exists : function (array, value) {
        for (var i = 0, len = array.length; i < len; i++) if (array[i] == value) return true
            
        return false
    },
    
    
    map : function (array, func, scope) {
        scope = scope || this
        
        var res = []
        
        for (var i = 0, len = array.length; i < len; i++) 
            res.push( func.call(scope, array[i], i) )
            
        return res
    },
    

    grep : function (array, func) {
        var a = []
        
        Joose.A.each(array, function (t) {
            if (func(t)) a.push(t)
        })
        
        return a
    },
    
    
    remove : function (array, removeEle) {
        var a = []
        
        Joose.A.each(array, function (t) {
            if (t !== removeEle) a.push(t)
        })
        
        return a
    }
    
}

// Static helpers for Strings
Joose.S = {
    
    saneSplit : function (str, delimeter) {
        var res = (str || '').split(delimeter)
        
        if (res.length == 1 && !res[0]) res.shift()
        
        return res
    },
    

    uppercaseFirst : function (string) { 
        return string.substr(0, 1).toUpperCase() + string.substr(1, string.length - 1)
    },
    
    
    strToClass : function (name, top) {
        var current = top || Joose.top
        
        Joose.A.each(name.split('.'), function (segment) {
            if (current) 
                current = current[ segment ]
            else
                return false
        })
        
        return current
    }
}

var baseFunc    = function () {}

var enumProps   = [ 'hasOwnProperty', 'valueOf', 'toString', 'constructor' ]

var manualEnum  = true

for (var i in { toString : 1 }) manualEnum = false


// Static helpers for objects
Joose.O = {

    each : function (object, func, scope) {
        scope = scope || this
        
        for (var i in object) 
            if (func.call(scope, object[i], i) === false) return false
        
        if (manualEnum) 
            return Joose.A.each(enumProps, function (el) {
                
                if (object.hasOwnProperty(el)) return func.call(scope, object[el], el)
            })
    },
    
    
    eachOwn : function (object, func, scope) {
        scope = scope || this
        
        return Joose.O.each(object, function (value, name) {
            if (object.hasOwnProperty(name)) return func.call(scope, value, name)
        }, scope)
    },
    
    
    copy : function (source, target) {
        target = target || {}
        
        Joose.O.each(source, function (value, name) { target[name] = value })
        
        return target
    },
    
    
    copyOwn : function (source, target) {
        target = target || {}
        
        Joose.O.eachOwn(source, function (value, name) { target[name] = value })
        
        return target
    },
    
    
    getMutableCopy : function (object) {
        baseFunc.prototype = object
        
        return new baseFunc()
    },
    
    
    extend : function (target, source) {
        return Joose.O.copy(source, target)
    },
    
    
    isEmpty : function (object) {
        for (var i in object) if (object.hasOwnProperty(i)) return false
        
        return true
    },
    
    
    isInstance: function (obj) {
        return obj && obj.meta && obj.constructor == obj.meta.c
    },
    
    
    isClass : function (obj) {
        return obj && obj.meta && obj.meta.c == obj
    },
    
    
    wantArray : function (obj) {
        if (obj instanceof Array) return obj
        
        return [ obj ]
    },
    
    
    // this was a bug in WebKit, which gives typeof / / == 'function'
    // should be monitored and removed at some point in the future
    isFunction : function (obj) {
        return typeof obj == 'function' && obj.constructor != / /.constructor
    }
}


//initializers

Joose.I = {
    Array       : function () { return [] },
    Object      : function () { return {} },
    Function    : function () { return arguments.callee },
    Now         : function () { return new Date() }
};
Joose.Proto = Joose.stub()

Joose.Proto.Empty = Joose.stub()
    
Joose.Proto.Empty.meta = {};
;(function () {

    Joose.Proto.Object = Joose.stub()
    
    
    var SUPER = function () {
        var self = SUPER.caller
        
        if (self == SUPERARG) self = self.caller
        
        if (!self.SUPER) throw "Invalid call to SUPER"
        
        return self.SUPER[self.methodName].apply(this, arguments)
    }
    
    
    var SUPERARG = function () {
        return this.SUPER.apply(this, arguments[0])
    }
    
    
    
    Joose.Proto.Object.prototype = {
        
        SUPERARG : SUPERARG,
        SUPER : SUPER,
        
        INNER : function () {
            throw "Invalid call to INNER"
        },                
        
        
        BUILD : function (config) {
            return arguments.length == 1 && typeof config == 'object' && config || {}
        },
        
        
        initialize: function () {
        },
        
        
        toString: function () {
            return "a " + this.meta.name
        }
        
    }
        
    Joose.Proto.Object.meta = {
        constructor     : Joose.Proto.Object,
        
        methods         : Joose.O.copy(Joose.Proto.Object.prototype),
        attributes      : {}
    }
    
    Joose.Proto.Object.prototype.meta = Joose.Proto.Object.meta

})();
;(function () {

    Joose.Proto.Class = function () {
        return this.initialize(this.BUILD.apply(this, arguments)) || this
    }
    
    var bootstrap = {
        
        VERSION             : null,
        AUTHORITY           : null,
        
        constructor         : Joose.Proto.Class,
        superClass          : null,
        
        name                : null,
        
        attributes          : null,
        methods             : null,
        
        meta                : null,
        c                   : null,
        
        defaultSuperClass   : Joose.Proto.Object,
        
        
        BUILD : function (name, extend) {
            this.name = name
            
            return { __extend__ : extend || {} }
        },
        
        
        initialize: function (props) {
            var extend      = props.__extend__
            
            this.VERSION    = extend.VERSION
            this.AUTHORITY  = extend.AUTHORITY
            
            delete extend.VERSION
            delete extend.AUTHORITY
            
            this.c = this.extractConstructor(extend)
            
            this.adaptConstructor(this.c)
            
            if (extend.constructorOnly) {
                delete extend.constructorOnly
                return
            }
            
            this.construct(extend)
        },
        
        
        construct : function (extend) {
            if (!this.prepareProps(extend)) return
            
            var superClass = this.superClass = this.extractSuperClass(extend)
            
            this.processSuperClass(superClass)
            
            this.adaptPrototype(this.c.prototype)
            
            this.finalize(extend)
        },
        
        
        finalize : function (extend) {
            this.processStem(extend)
            
            this.extend(extend)
        },
        
        
        //if the extension returns false from this method it should re-enter 'construct'
        prepareProps : function (extend) {
            return true
        },
        
        
        extractConstructor : function (extend) {
            var res = extend.hasOwnProperty('constructor') ? extend.constructor : this.defaultConstructor()
            
            delete extend.constructor
            
            return res
        },
        
        
        extractSuperClass : function (extend) {
            if (extend.hasOwnProperty('isa') && !extend.isa) throw new Error("Attempt to inherit from undefined superclass [" + this.name + "]")
            
            var res = extend.isa || this.defaultSuperClass
            
            delete extend.isa
            
            return res
        },
        
        
        processStem : function () {
            var superMeta       = this.superClass.meta
            
            this.methods        = Joose.O.getMutableCopy(superMeta.methods || {})
            this.attributes     = Joose.O.getMutableCopy(superMeta.attributes || {})
        },
        
        
        initInstance : function (instance, props) {
            Joose.O.copyOwn(props, instance)
        },
        
        
        defaultConstructor: function () {
            return function (arg) {
                var BUILD = this.BUILD
                
                var args = BUILD && BUILD.apply(this, arguments) || arg || {}
                
                var thisMeta    = this.meta
                
                thisMeta.initInstance(this, args)
                
                return thisMeta.hasMethod('initialize') && this.initialize(args) || this
            }
        },
        
        
        processSuperClass: function (superClass) {
            var superProto      = superClass.prototype
            
            //non-Joose superclasses
            if (!superClass.meta) {
                
                var extend = Joose.O.copy(superProto)
                
                extend.isa = Joose.Proto.Empty
                // clear potential value in the `extend.constructor` to prevent it from being modified
                delete extend.constructor
                
                var meta = new this.defaultSuperClass.meta.constructor(null, extend)
                
                superClass.meta = superProto.meta = meta
                
                meta.c = superClass
            }
            
            this.c.prototype    = Joose.O.getMutableCopy(superProto)
            this.c.superClass   = superProto
        },
        
        
        adaptConstructor: function (c) {
            c.meta = this
            
            if (!c.hasOwnProperty('toString')) c.toString = function () { return this.meta.name }
        },
    
        
        adaptPrototype: function (proto) {
            //this will fix weird semantic of native "constructor" property to more intuitive (idea borrowed from Ext)
            proto.constructor   = this.c
            proto.meta          = this
        },
        
        
        addMethod: function (name, func) {
            func.SUPER = this.superClass.prototype
            
            //chrome don't allow to redefine the "name" property
            func.methodName = name
            
            this.methods[name] = func
            this.c.prototype[name] = func
        },
        
        
        addAttribute: function (name, init) {
            this.attributes[name] = init
            this.c.prototype[name] = init
        },
        
        
        removeMethod : function (name) {
            delete this.methods[name]
            delete this.c.prototype[name]
        },
    
        
        removeAttribute: function (name) {
            delete this.attributes[name]
            delete this.c.prototype[name]
        },
        
        
        hasMethod: function (name) { 
            return Boolean(this.methods[name])
        },
        
        
        hasAttribute: function (name) { 
            return this.attributes[name] !== undefined
        },
        
    
        hasOwnMethod: function (name) { 
            return this.hasMethod(name) && this.methods.hasOwnProperty(name)
        },
        
        
        hasOwnAttribute: function (name) { 
            return this.hasAttribute(name) && this.attributes.hasOwnProperty(name)
        },
        
        
        extend : function (props) {
            Joose.O.eachOwn(props, function (value, name) {
                if (name != 'meta' && name != 'constructor') 
                    if (Joose.O.isFunction(value) && !value.meta) 
                        this.addMethod(name, value) 
                    else 
                        this.addAttribute(name, value)
            }, this)
        },
        
        
        subClassOf : function (classObject, extend) {
            return this.subClass(extend, null, classObject)
        },
    
    
        subClass : function (extend, name, classObject) {
            extend      = extend        || {}
            extend.isa  = classObject   || this.c
            
            return new this.constructor(name, extend).c
        },
        
        
        instantiate : function () {
            var f = function () {}
            
            f.prototype = this.c.prototype
            
            var obj = new f()
            
            return this.c.apply(obj, arguments) || obj
        }
    }
    
    //micro bootstraping
    
    Joose.Proto.Class.prototype = Joose.O.getMutableCopy(Joose.Proto.Object.prototype)
    
    Joose.O.extend(Joose.Proto.Class.prototype, bootstrap)
    
    Joose.Proto.Class.prototype.meta = new Joose.Proto.Class('Joose.Proto.Class', bootstrap)
    
    
    
    Joose.Proto.Class.meta.addMethod('isa', function (someClass) {
        var f = function () {}
        
        f.prototype = this.c.prototype
        
        return new f() instanceof someClass
    })
})();
Joose.Managed = Joose.stub()

Joose.Managed.Property = new Joose.Proto.Class('Joose.Managed.Property', {
    
    name            : null,
    
    init            : null,
    value           : null,
    
    definedIn       : null,
    
    
    initialize : function (props) {
        Joose.Managed.Property.superClass.initialize.call(this, props)
        
        this.computeValue()
    },
    
    
    computeValue : function () {
        this.value = this.init
    },    
    
    
    //targetClass is still open at this stage
    preApply : function (targetClass) {
    },
    

    //targetClass is already open at this stage
    postUnApply : function (targetClass) {
    },
    
    
    apply : function (target) {
        target[this.name] = this.value
    },
    
    
    isAppliedTo : function (target) {
        return target[this.name] == this.value
    },
    
    
    unapply : function (from) {
        if (!this.isAppliedTo(from)) throw "Unapply of property [" + this.name + "] from [" + from + "] failed"
        
        delete from[this.name]
    },
    
    
    cloneProps : function () {
        return {
            name        : this.name, 
            init        : this.init,
            definedIn   : this.definedIn
        }
    },

    
    clone : function (name) {
        var props = this.cloneProps()
        
        props.name = name || props.name
        
        return new this.constructor(props)
    }
    
    
}).c;
Joose.Managed.Property.ConflictMarker = new Joose.Proto.Class('Joose.Managed.Property.ConflictMarker', {
    
    isa : Joose.Managed.Property,

    apply : function (target) {
        throw new Error("Attempt to apply ConflictMarker [" + this.name + "] to [" + target + "]")
    }
    
}).c;
Joose.Managed.Property.Requirement = new Joose.Proto.Class('Joose.Managed.Property.Requirement', {
    
    isa : Joose.Managed.Property,

    
    apply : function (target) {
        if (!target.meta.hasMethod(this.name)) 
            throw new Error("Requirement [" + this.name + "], defined in [" + this.definedIn.definedIn.name + "] is not satisfied for class [" + target + "]")
    },
    
    
    unapply : function (from) {
    }
    
}).c;
Joose.Managed.Property.Attribute = new Joose.Proto.Class('Joose.Managed.Property.Attribute', {
    
    isa : Joose.Managed.Property,
    
    slot                : null,
    
    
    initialize : function () {
        Joose.Managed.Property.Attribute.superClass.initialize.apply(this, arguments)
        
        this.slot = this.name
    },
    
    
    apply : function (target) {
        target.prototype[ this.slot ] = this.value
    },
    
    
    isAppliedTo : function (target) {
        return target.prototype[ this.slot ] == this.value
    },
    
    
    unapply : function (from) {
        if (!this.isAppliedTo(from)) throw "Unapply of property [" + this.name + "] from [" + from + "] failed"
        
        delete from.prototype[this.slot]
    },
    
    
    clearValue : function (instance) {
        delete instance[ this.slot ]
    },
    
    
    hasValue : function (instance) {
        return instance.hasOwnProperty(this.slot)
    },
        
        
    getRawValueFrom : function (instance) {
        return instance[ this.slot ]
    },
    
    
    setRawValueTo : function (instance, value) {
        instance[ this.slot ] = value
        
        return this
    }
    
}).c;
Joose.Managed.Property.MethodModifier = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier', {
    
    isa : Joose.Managed.Property,

    
    prepareWrapper : function () {
        throw "Abstract method [prepareWrapper] of " + this + " was called"
    },
    
    
    apply : function (target) {
        var name            = this.name
        var targetProto     = target.prototype
        var isOwn           = targetProto.hasOwnProperty(name)
        var original        = targetProto[name]
        var superProto      = target.meta.superClass.prototype
        
        
        var originalCall = isOwn ? original : function () { 
            return superProto[name].apply(this, arguments) 
        }
        
        var methodWrapper = this.prepareWrapper({
            name            : name,
            modifier        : this.value, 
            
            isOwn           : isOwn,
            originalCall    : originalCall, 
            
            superProto      : superProto,
            
            target          : target
        })
        
        if (isOwn) methodWrapper.__ORIGINAL__ = original
        
        methodWrapper.__CONTAIN__   = this.value
        methodWrapper.__METHOD__    = this
        
        targetProto[name] = methodWrapper
    },
    
    
    isAppliedTo : function (target) {
        var targetCont = target.prototype[this.name]
        
        return targetCont && targetCont.__CONTAIN__ == this.value
    },
    
    
    unapply : function (from) {
        var name = this.name
        var fromProto = from.prototype
        var original = fromProto[name].__ORIGINAL__
        
        if (!this.isAppliedTo(from)) throw "Unapply of method [" + name + "] from class [" + from + "] failed"
        
        //if modifier was applied to own method - restore it
        if (original) 
            fromProto[name] = original
        //otherwise - just delete it, to reveal the inherited method 
        else
            delete fromProto[name]
    }
    
}).c;
Joose.Managed.Property.MethodModifier.Override = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Override', {
    
    isa : Joose.Managed.Property.MethodModifier,

    
    prepareWrapper : function (params) {
        
        var modifier        = params.modifier
        var originalCall    = params.originalCall
        var superProto      = params.superProto
        var superMetaConst  = superProto.meta.constructor
        
        //call to Joose.Proto level, require some additional processing
        var isCallToProto = (superMetaConst == Joose.Proto.Class || superMetaConst == Joose.Proto.Object) && !(params.isOwn && originalCall.IS_OVERRIDE) 
        
        var original = originalCall
        
        if (isCallToProto) original = function () {
            var beforeSUPER = this.SUPER
            
            this.SUPER  = superProto.SUPER
            
            var res = originalCall.apply(this, arguments)
            
            this.SUPER = beforeSUPER
            
            return res
        }

        var override = function () {
            
            var beforeSUPER = this.SUPER
            
            this.SUPER  = original
            
            var res = modifier.apply(this, arguments)
            
            this.SUPER = beforeSUPER
            
            return res
        }
        
        override.IS_OVERRIDE = true
        
        return override
    }
    
    
}).c;
Joose.Managed.Property.MethodModifier.Put = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Put', {
    
    isa : Joose.Managed.Property.MethodModifier.Override,


    prepareWrapper : function (params) {
        
        if (params.isOwn) throw "Method [" + params.name + "] is applying over something [" + params.originalCall + "] in class [" + params.target + "]"
        
        return Joose.Managed.Property.MethodModifier.Put.superClass.prepareWrapper.call(this, params)
    }
    
    
}).c;
Joose.Managed.Property.MethodModifier.After = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.After', {
    
    isa : Joose.Managed.Property.MethodModifier,

    
    prepareWrapper : function (params) {
        
        var modifier        = params.modifier
        var originalCall    = params.originalCall
        
        return function () {
            var res = originalCall.apply(this, arguments)
            modifier.apply(this, arguments)
            return res
        }
    }    

    
}).c;
Joose.Managed.Property.MethodModifier.Before = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Before', {
    
    isa : Joose.Managed.Property.MethodModifier,

    
    prepareWrapper : function (params) {
        
        var modifier        = params.modifier
        var originalCall    = params.originalCall
        
        return function () {
            modifier.apply(this, arguments)
            return originalCall.apply(this, arguments)
        }
    }
    
}).c;
Joose.Managed.Property.MethodModifier.Around = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Around', {
    
    isa : Joose.Managed.Property.MethodModifier,

    prepareWrapper : function (params) {
        
        var modifier        = params.modifier
        var originalCall    = params.originalCall
        
        var me
        
        var bound = function () {
            return originalCall.apply(me, arguments)
        }
            
        return function () {
            me = this
            
            var boundArr = [ bound ]
            boundArr.push.apply(boundArr, arguments)
            
            return modifier.apply(this, boundArr)
        }
    }
    
}).c;
Joose.Managed.Property.MethodModifier.Augment = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Augment', {
    
    isa : Joose.Managed.Property.MethodModifier,

    
    prepareWrapper : function (params) {
        
        var AUGMENT = function () {
            
            //populate callstack to the most deep non-augment method
            var callstack = []
            
            var self = AUGMENT
            
            do {
                callstack.push(self.IS_AUGMENT ? self.__CONTAIN__ : self)
                
                self = self.IS_AUGMENT && (self.__ORIGINAL__ || self.SUPER[self.methodName])
            } while (self)
            
            
            //save previous INNER
            var beforeINNER = this.INNER
            
            //create new INNER
            this.INNER = function () {
                var innerCall = callstack.pop()
                
                return innerCall ? innerCall.apply(this, arguments) : undefined
            }
            
            //augment modifier results in hypotetical INNER call of the same method in subclass 
            var res = this.INNER.apply(this, arguments)
            
            //restore previous INNER chain
            this.INNER = beforeINNER
            
            return res
        }
        
        AUGMENT.methodName  = params.name
        AUGMENT.SUPER       = params.superProto
        AUGMENT.IS_AUGMENT  = true
        
        return AUGMENT
    }
    
}).c;
Joose.Managed.PropertySet = new Joose.Proto.Class('Joose.Managed.PropertySet', {
    
    isa                       : Joose.Managed.Property,

    properties                : null,
    
    propertyMetaClass         : Joose.Managed.Property,
    
    
    initialize : function (props) {
        Joose.Managed.PropertySet.superClass.initialize.call(this, props)
        
        //XXX this guards the meta roles :)
        this.properties = props.properties || {}
    },
    
    
    addProperty : function (name, props) {
        var metaClass = props.meta || this.propertyMetaClass
        delete props.meta
        
        props.definedIn     = this
        props.name          = name
        
        return this.properties[name] = new metaClass(props)
    },
    
    
    addPropertyObject : function (object) {
        return this.properties[object.name] = object
    },
    
    
    removeProperty : function (name) {
        var prop = this.properties[name]
        
        delete this.properties[name]
        
        return prop
    },
    
    
    haveProperty : function (name) {
        return this.properties[name] != null
    },
    

    haveOwnProperty : function (name) {
        return this.haveProperty(name) && this.properties.hasOwnProperty(name)
    },
    
    
    getProperty : function (name) {
        return this.properties[name]
    },
    
    
    //includes inherited properties (probably you wants 'eachOwn', which process only "own" (including consumed from Roles) properties) 
    each : function (func, scope) {
        Joose.O.each(this.properties, func, scope || this)
    },
    
    
    eachOwn : function (func, scope) {
        Joose.O.eachOwn(this.properties, func, scope || this)
    },
    
    
    //synonym for each
    eachAll : function (func, scope) {
        this.each(func, scope)
    },
    
    
    cloneProps : function () {
        var props = Joose.Managed.PropertySet.superClass.cloneProps.call(this)
        
        props.propertyMetaClass     = this.propertyMetaClass
        
        return props
    },
    
    
    clone : function (name) {
        var clone = this.cleanClone(name)
        
        clone.properties = Joose.O.copyOwn(this.properties)
        
        return clone
    },
    
    
    cleanClone : function (name) {
        var props = this.cloneProps()
        
        props.name = name || props.name
        
        return new this.constructor(props)
    },
    
    
    alias : function (what) {
        var props = this.properties
        
        Joose.O.each(what, function (aliasName, originalName) {
            var original = props[originalName]
            
            if (original) this.addPropertyObject(original.clone(aliasName))
        }, this)
    },
    
    
    exclude : function (what) {
        var props = this.properties
        
        Joose.A.each(what, function (name) {
            delete props[name]
        })
    },
    
    
    beforeConsumedBy : function () {
    },
    
    
    flattenTo : function (target) {
        var targetProps = target.properties
        
        this.eachOwn(function (property, name) {
            var targetProperty = targetProps[name]
            
            if (targetProperty instanceof Joose.Managed.Property.ConflictMarker) return
            
            if (!targetProps.hasOwnProperty(name) || targetProperty == null) {
                target.addPropertyObject(property)
                return
            }
            
            if (targetProperty == property) return
            
            target.removeProperty(name)
            target.addProperty(name, {
                meta : Joose.Managed.Property.ConflictMarker
            })
        }, this)
    },
    
    
    composeTo : function (target) {
        this.eachOwn(function (property, name) {
            if (!target.haveOwnProperty(name)) target.addPropertyObject(property)
        })
    },
    
    
    composeFrom : function () {
        if (!arguments.length) return
        
        var flattening = this.cleanClone()
        
        Joose.A.each(arguments, function (arg) {
            var isDescriptor    = !(arg instanceof Joose.Managed.PropertySet)
            var propSet         = isDescriptor ? arg.propertySet : arg
            
            propSet.beforeConsumedBy(this, flattening)
            
            if (isDescriptor) {
                if (arg.alias || arg.exclude)   propSet = propSet.clone()
                if (arg.alias)                  propSet.alias(arg.alias)
                if (arg.exclude)                propSet.exclude(arg.exclude)
            }
            
            propSet.flattenTo(flattening)
        }, this)
        
        flattening.composeTo(this)
    },
    
    
    preApply : function (target) {
        this.eachOwn(function (property) {
            property.preApply(target)
        })
    },
    
    
    apply : function (target) {
        this.eachOwn(function (property) {
            property.apply(target)
        })
    },
    
    
    unapply : function (from) {
        this.eachOwn(function (property) {
            property.unapply(from)
        })
    },
    
    
    postUnApply : function (target) {
        this.eachOwn(function (property) {
            property.postUnApply(target)
        })
    }
    
}).c
;
var __ID__ = 1


Joose.Managed.PropertySet.Mutable = new Joose.Proto.Class('Joose.Managed.PropertySet.Mutable', {
    
    isa                 : Joose.Managed.PropertySet,

    ID                  : null,
    
    derivatives         : null,
    
    opened              : null,
    
    composedFrom        : null,
    
    
    initialize : function (props) {
        Joose.Managed.PropertySet.Mutable.superClass.initialize.call(this, props)
        
        //initially opened
        this.opened             = 1
        this.derivatives        = {}
        this.ID                 = __ID__++
        this.composedFrom       = []
    },
    
    
    addComposeInfo : function () {
        this.ensureOpen()
        
        Joose.A.each(arguments, function (arg) {
            this.composedFrom.push(arg)
            
            var propSet = arg instanceof Joose.Managed.PropertySet ? arg : arg.propertySet
                
            propSet.derivatives[this.ID] = this
        }, this)
    },
    
    
    removeComposeInfo : function () {
        this.ensureOpen()
        
        Joose.A.each(arguments, function (arg) {
            
            var i = 0
            
            while (i < this.composedFrom.length) {
                var propSet = this.composedFrom[i]
                propSet = propSet instanceof Joose.Managed.PropertySet ? propSet : propSet.propertySet
                
                if (arg == propSet) {
                    delete propSet.derivatives[this.ID]
                    this.composedFrom.splice(i, 1)
                } else i++
            }
            
        }, this)
    },
    
    
    ensureOpen : function () {
        if (!this.opened) throw "Mutation of closed property set: [" + this.name + "]"
    },
    
    
    addProperty : function (name, props) {
        this.ensureOpen()
        
        return Joose.Managed.PropertySet.Mutable.superClass.addProperty.call(this, name, props)
    },
    

    addPropertyObject : function (object) {
        this.ensureOpen()
        
        return Joose.Managed.PropertySet.Mutable.superClass.addPropertyObject.call(this, object)
    },
    
    
    removeProperty : function (name) {
        this.ensureOpen()
        
        return Joose.Managed.PropertySet.Mutable.superClass.removeProperty.call(this, name)
    },
    
    
    composeFrom : function () {
        this.ensureOpen()
        
        return Joose.Managed.PropertySet.Mutable.superClass.composeFrom.apply(this, this.composedFrom)
    },
    
    
    open : function () {
        this.opened++
        
        if (this.opened == 1) {
        
            Joose.O.each(this.derivatives, function (propSet) {
                propSet.open()
            })
            
            this.deCompose()
        }
    },
    
    
    close : function () {
        if (!this.opened) throw "Unmatched 'close' operation on property set: [" + this.name + "]"
        
        if (this.opened == 1) {
            this.reCompose()
            
            Joose.O.each(this.derivatives, function (propSet) {
                propSet.close()
            })
        }
        this.opened--
    },
    
    
    reCompose : function () {
        this.composeFrom()
    },
    
    
    deCompose : function () {
        this.eachOwn(function (property, name) {
            if (property.definedIn != this) this.removeProperty(name)
        }, this)
    }
    
}).c;
Joose.Managed.StemElement = function () { throw "Modules may not be instantiated." }

Joose.Managed.StemElement.Attributes = new Joose.Proto.Class('Joose.Managed.StemElement.Attributes', {
    
    isa                     : Joose.Managed.PropertySet.Mutable,
    
    propertyMetaClass       : Joose.Managed.Property.Attribute
    
}).c
;
Joose.Managed.StemElement.Methods = new Joose.Proto.Class('Joose.Managed.StemElement.Methods', {
    
    isa : Joose.Managed.PropertySet.Mutable,
    
    propertyMetaClass : Joose.Managed.Property.MethodModifier.Put,

    
    preApply : function () {
    },
    
    
    postUnApply : function () {
    }
    
}).c;
Joose.Managed.StemElement.Requirements = new Joose.Proto.Class('Joose.Managed.StemElement.Requirements', {

    isa                     : Joose.Managed.PropertySet.Mutable,
    
    propertyMetaClass       : Joose.Managed.Property.Requirement,
    
    
    
    alias : function () {
    },
    
    
    exclude : function () {
    },
    
    
    flattenTo : function (target) {
        this.each(function (property, name) {
            if (!target.haveProperty(name)) target.addPropertyObject(property)
        })
    },
    
    
    composeTo : function (target) {
        this.flattenTo(target)
    },
    
    
    preApply : function () {
    },
    
    
    postUnApply : function () {
    }
    
}).c;
Joose.Managed.StemElement.MethodModifiers = new Joose.Proto.Class('Joose.Managed.StemElement.MethodModifiers', {

    isa                     : Joose.Managed.PropertySet.Mutable,
    
    propertyMetaClass       : null,
    
    
    addProperty : function (name, props) {
        var metaClass = props.meta
        delete props.meta
        
        props.definedIn         = this
        props.name              = name
        
        var modifier            = new metaClass(props)
        var properties          = this.properties
        
        if (!properties[name]) properties[ name ] = []
        
        properties[name].push(modifier)
        
        return modifier
    },
    

    addPropertyObject : function (object) {
        var name            = object.name
        var properties      = this.properties
        
        if (!properties[name]) properties[name] = []
        
        properties[name].push(object)
        
        return object
    },
    
    
    //remove only the last modifier
    removeProperty : function (name) {
        if (!this.haveProperty(name)) return undefined
        
        var properties      = this.properties
        var modifier        = properties[ name ].pop()
        
        //if all modifiers were removed - clearing the properties
        if (!properties[name].length) Joose.Managed.StemElement.MethodModifiers.superClass.removeProperty.call(this, name)
        
        return modifier
    },
    
    
    alias : function () {
    },
    
    
    exclude : function () {
    },
    
    
    flattenTo : function (target) {
        var targetProps = target.properties
        
        this.each(function (modifiersArr, name) {
            var targetModifiersArr = targetProps[name]
            
            if (targetModifiersArr == null) targetModifiersArr = targetProps[name] = []
            
            Joose.A.each(modifiersArr, function (modifier) {
                if (!Joose.A.exists(targetModifiersArr, modifier)) targetModifiersArr.push(modifier)
            })
            
        })
    },
    
    
    composeTo : function (target) {
        this.flattenTo(target)
    },

    
    deCompose : function () {
        this.each(function (modifiersArr, name) {
            var i = 0
            
            while (i < modifiersArr.length) 
                if (modifiersArr[i].definedIn != this) 
                    modifiersArr.splice(i, 1)
                else 
                    i++
        })
    },
    
    
    preApply : function (target) {
    },

    
    postUnApply : function (target) {
    },
    
    
    apply : function (target) {
        this.each(function (modifiersArr, name) {
            Joose.A.each(modifiersArr, function (modifier) {
                modifier.apply(target)
            })
        })
    },
    
    
    unapply : function (from) {
        this.each(function (modifiersArr, name) {
            for (var i = modifiersArr.length - 1; i >=0 ; i--) modifiersArr[i].unapply(from)
        })
    }
    
    
    
}).c;
Joose.Managed.PropertySet.Composition = new Joose.Proto.Class('Joose.Managed.PropertySet.Composition', {
    
    isa                         : Joose.Managed.PropertySet.Mutable,
    
    propertyMetaClass           : Joose.Managed.PropertySet.Mutable,
    
    processOrder                : null,

    
    each : function (func, scope) {
        var props   = this.properties
        var scope   = scope || this
        
        Joose.A.each(this.processOrder, function (name) {
            func.call(scope, props[name], name)
        })
    },
    
    
    eachR : function (func, scope) {
        var props   = this.properties
        var scope   = scope || this
        
        Joose.A.eachR(this.processOrder, function (name) {
            func.call(scope, props[name], name)
        })
        
        
//        var props           = this.properties
//        var processOrder    = this.processOrder
//        
//        for(var i = processOrder.length - 1; i >= 0; i--) 
//            func.call(scope || this, props[ processOrder[i] ], processOrder[i])
    },
    
    
    clone : function (name) {
        var clone = this.cleanClone(name)
        
        this.each(function (property) {
            clone.addPropertyObject(property.clone())
        })
        
        return clone
    },
    
    
    alias : function (what) {
        this.each(function (property) {
            property.alias(what)
        })
    },
    
    
    exclude : function (what) {
        this.each(function (property) {
            property.exclude(what)
        })
    },
    
    
    flattenTo : function (target) {
        var targetProps = target.properties
        
        this.each(function (property, name) {
            var subTarget = targetProps[name] || target.addProperty(name, {
                meta : property.constructor
            })
            
            property.flattenTo(subTarget)
        })
    },
    
    
    composeTo : function (target) {
        var targetProps = target.properties
        
        this.each(function (property, name) {
            var subTarget = targetProps[name] || target.addProperty(name, {
                meta : property.constructor
            })
            
            property.composeTo(subTarget)
        })
    },
    
    
    
    deCompose : function () {
        this.eachR(function (property) {
            property.open()
        })
        
        Joose.Managed.PropertySet.Composition.superClass.deCompose.call(this)
    },
    
    
    reCompose : function () {
        Joose.Managed.PropertySet.Composition.superClass.reCompose.call(this)
        
        this.each(function (property) {
            property.close()
        })
    },
    
    
    unapply : function (from) {
        this.eachR(function (property) {
            property.unapply(from)
        })
    }
    
}).c
;
Joose.Managed.Stem = new Joose.Proto.Class('Joose.Managed.Stem', {
    
    isa                  : Joose.Managed.PropertySet.Composition,
    
    targetMeta           : null,
    
    attributesMC         : Joose.Managed.StemElement.Attributes,
    methodsMC            : Joose.Managed.StemElement.Methods,
    requirementsMC       : Joose.Managed.StemElement.Requirements,
    methodsModifiersMC   : Joose.Managed.StemElement.MethodModifiers,
    
    processOrder         : [ 'attributes', 'methods', 'requirements', 'methodsModifiers' ],
    
    
    initialize : function (props) {
        Joose.Managed.Stem.superClass.initialize.call(this, props)
        
        var targetMeta = this.targetMeta
        
        this.addProperty('attributes', {
            meta : this.attributesMC,
            
            //it can be no 'targetMeta' in clones
            properties : targetMeta ? targetMeta.attributes : {}
        })
        
        
        this.addProperty('methods', {
            meta : this.methodsMC,
            
            properties : targetMeta ? targetMeta.methods : {}
        })
        
        
        this.addProperty('requirements', {
            meta : this.requirementsMC
        })
        
        
        this.addProperty('methodsModifiers', {
            meta : this.methodsModifiersMC
        })
    },
    
    
    reCompose : function () {
        var c       = this.targetMeta.c
        
        this.preApply(c)
        
        Joose.Managed.Stem.superClass.reCompose.call(this)
        
        this.apply(c)
    },
    
    
    deCompose : function () {
        var c       = this.targetMeta.c
        
        this.unapply(c)
        
        Joose.Managed.Stem.superClass.deCompose.call(this)
        
        this.postUnApply(c)
    }
    
    
}).c
;
Joose.Managed.Builder = new Joose.Proto.Class('Joose.Managed.Builder', {
    
    targetMeta          : null,
    
    
    _buildStart : function (targetMeta, props) {
        targetMeta.stem.open()
        
        Joose.A.each([ 'trait', 'traits', 'removeTrait', 'removeTraits', 'does', 'doesnot', 'doesnt' ], function (builder) {
            if (props[builder]) {
                this[builder](targetMeta, props[builder])
                delete props[builder]
            }
        }, this)
    },
    
    
    _extend : function (props) {
        if (Joose.O.isEmpty(props)) return
        
        var targetMeta = this.targetMeta
        
        this._buildStart(targetMeta, props)
        
        Joose.O.eachOwn(props, function (value, name) {
            var handler = this[name]
            
            if (!handler) throw new Error("Unknown builder [" + name + "] was used during extending of [" + targetMeta.c + "]")
            
            handler.call(this, targetMeta, value)
        }, this)
        
        this._buildComplete(targetMeta, props)
    },
    

    _buildComplete : function (targetMeta, props) {
        targetMeta.stem.close()
    },
    
    
    methods : function (targetMeta, info) {
        Joose.O.eachOwn(info, function (value, name) {
            targetMeta.addMethod(name, value)
        })
    },
    

    removeMethods : function (targetMeta, info) {
        Joose.A.each(info, function (name) {
            targetMeta.removeMethod(name)
        })
    },
    
    
    have : function (targetMeta, info) {
        Joose.O.eachOwn(info, function (value, name) {
            targetMeta.addAttribute(name, value)
        })
    },
    
    
    havenot : function (targetMeta, info) {
        Joose.A.each(info, function (name) {
            targetMeta.removeAttribute(name)
        })
    },
    

    havent : function (targetMeta, info) {
        this.havenot(targetMeta, info)
    },
    
    
    after : function (targetMeta, info) {
        Joose.O.each(info, function (value, name) {
            targetMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.After)
        })
    },
    
    
    before : function (targetMeta, info) {
        Joose.O.each(info, function (value, name) {
            targetMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.Before)
        })
    },
    
    
    override : function (targetMeta, info) {
        Joose.O.each(info, function (value, name) {
            targetMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.Override)
        })
    },
    
    
    around : function (targetMeta, info) {
        Joose.O.each(info, function (value, name) {
            targetMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.Around)
        })
    },
    
    
    augment : function (targetMeta, info) {
        Joose.O.each(info, function (value, name) {
            targetMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.Augment)
        })
    },
    
    
    removeModifier : function (targetMeta, info) {
        Joose.A.each(info, function (name) {
            targetMeta.removeMethodModifier(name)
        })
    },
    
    
    does : function (targetMeta, info) {
        Joose.A.each(Joose.O.wantArray(info), function (desc) {
            targetMeta.addRole(desc)
        })
    },
    

    doesnot : function (targetMeta, info) {
        Joose.A.each(Joose.O.wantArray(info), function (desc) {
            targetMeta.removeRole(desc)
        })
    },
    
    
    doesnt : function (targetMeta, info) {
        this.doesnot(targetMeta, info)
    },
    
    
    trait : function () {
        this.traits.apply(this, arguments)
    },
    
    
    traits : function (targetMeta, info) {
        if (targetMeta.firstPass) return
        
        if (!targetMeta.meta.isDetached) throw "Can't apply trait to not detached class"
        
        targetMeta.meta.extend({
            does : info
        })
    },
    
    
    removeTrait : function () {
        this.removeTraits.apply(this, arguments)
    },
     
    
    removeTraits : function (targetMeta, info) {
        if (!targetMeta.meta.isDetached) throw "Can't remove trait from not detached class"
        
        targetMeta.meta.extend({
            doesnot : info
        })
    }
    
    
    
}).c;
Joose.Managed.Class = new Joose.Proto.Class('Joose.Managed.Class', {
    
    isa                         : Joose.Proto.Class,
    
    stem                        : null,
    stemClass                   : Joose.Managed.Stem,
    stemClassCreated            : false,
    
    builder                     : null,
    builderClass                : Joose.Managed.Builder,
    builderClassCreated         : false,
    
    isDetached                  : false,
    firstPass                   : true,
    
    // a special instance, which, when passed as 1st argument to constructor, signifies that constructor should
    // skips traits processing for this instance
    skipTraitsAnchor            : {},
    
    
    //build for metaclasses - collects traits from roles
    BUILD : function () {
        var sup = Joose.Managed.Class.superClass.BUILD.apply(this, arguments)
        
        var props   = sup.__extend__
        
        var traits = Joose.O.wantArray(props.trait || props.traits || [])
        delete props.trait
        delete props.traits
        
        Joose.A.each(Joose.O.wantArray(props.does || []), function (arg) {
            var role = (arg.meta instanceof Joose.Managed.Class) ? arg : arg.role
            
            if (role.meta.meta.isDetached) traits.push(role.meta.constructor)
        })
        
        if (traits.length) props.traits = traits 
        
        return sup
    },
    
    
    initInstance : function (instance, props) {
        Joose.O.each(this.attributes, function (attribute, name) {
            
            if (attribute instanceof Joose.Managed.Attribute) 
                attribute.initFromConfig(instance, props)
            else 
                if (props.hasOwnProperty(name)) instance[name] = props[name]
        })
    },
    
    
    // we are using the same constructor for usual and meta- classes
    defaultConstructor: function () {
        return function (skipTraitsAnchor, params) {
            
            var thisMeta    = this.meta
            var skipTraits  = skipTraitsAnchor == thisMeta.skipTraitsAnchor
            
            var BUILD       = this.BUILD
            
            var props       = BUILD && BUILD.apply(this, skipTraits ? params : arguments) || (skipTraits ? params[0] : skipTraitsAnchor) || {}
            
            
            // either looking for traits in __extend__ (meta-class) or in usual props (usual class)
            var extend  = props.__extend__ || props
            
            var traits = extend.trait || extend.traits
            
            if (traits || extend.detached) {
                delete extend.trait
                delete extend.traits
                delete extend.detached
                
                if (!skipTraits) {
                    var classWithTrait  = thisMeta.subClass({ does : traits || [] }, thisMeta.name)
                    var meta            = classWithTrait.meta
                    meta.isDetached     = true
                    
                    return meta.instantiate(thisMeta.skipTraitsAnchor, arguments)
                }
            }
            
            thisMeta.initInstance(this, props)
            
            return thisMeta.hasMethod('initialize') && this.initialize(props) || this
        }
    },
    
    
    finalize: function (extend) {
        Joose.Managed.Class.superClass.finalize.call(this, extend)
        
        this.stem.close()
        
        this.afterMutate()
    },
    
    
    processStem : function () {
        Joose.Managed.Class.superClass.processStem.call(this)
        
        this.builder    = new this.builderClass({ targetMeta : this })
        this.stem       = new this.stemClass({ name : this.name, targetMeta : this })
        
        var builderClass = this.getClassInAttribute('builderClass')
        
        if (builderClass) {
            this.builderClassCreated = true
            this.addAttribute('builderClass', this.subClassOf(builderClass))
        }
        
        
        var stemClass = this.getClassInAttribute('stemClass')
        
        if (stemClass) {
            this.stemClassCreated = true
            this.addAttribute('stemClass', this.subClassOf(stemClass))
        }
    },
    
    
    extend : function (props) {
        if (props.builder) {
            this.getBuilderTarget().meta.extend(props.builder)
            delete props.builder
        }
        
        if (props.stem) {
            this.getStemTarget().meta.extend(props.stem)
            delete props.stem
        }
        
        this.builder._extend(props)
        
        this.firstPass = false
        
        if (!this.stem.opened) this.afterMutate()
    },
    
    
    getBuilderTarget : function () {
        var builderClass = this.getClassInAttribute('builderClass')
        if (!builderClass) throw "Attempt to extend a builder on non-meta class"
        
        return builderClass
    },
    

    getStemTarget : function () {
        var stemClass = this.getClassInAttribute('stemClass')
        if (!stemClass) throw "Attempt to extend a stem on non-meta class"
        
        return stemClass
    },
    
    
    getClassInAttribute : function (attributeName) {
        var attrClass = this.getAttribute(attributeName)
        if (attrClass instanceof Joose.Managed.Property.Attribute) attrClass = attrClass.value
        
        return attrClass
    },
    
    
    addMethodModifier: function (name, func, type) {
        var props = {}
        
        props.init = func
        props.meta = type
        
        return this.stem.properties.methodsModifiers.addProperty(name, props)
    },
    
    
    removeMethodModifier: function (name) {
        return this.stem.properties.methodsModifiers.removeProperty(name)
    },
    
    
    addMethod: function (name, func, props) {
        props = props || {}
        props.init = func
        
        return this.stem.properties.methods.addProperty(name, props)
    },
    
    
    addAttribute: function (name, init, props) {
        props = props || {}
        props.init = init
        
        return this.stem.properties.attributes.addProperty(name, props)
    },
    
    
    removeMethod : function (name) {
        return this.stem.properties.methods.removeProperty(name)
    },

    
    removeAttribute: function (name) {
        return this.stem.properties.attributes.removeProperty(name)
    },
    
    
    hasMethod: function (name) {
        return this.stem.properties.methods.haveProperty(name)
    },
    
    
    hasAttribute: function (name) { 
        return this.stem.properties.attributes.haveProperty(name)
    },
    
    
    hasMethodModifiersFor : function (name) {
        return this.stem.properties.methodsModifiers.haveProperty(name)
    },
    
    
    hasOwnMethod: function (name) {
        return this.stem.properties.methods.haveOwnProperty(name)
    },
    
    
    hasOwnAttribute: function (name) { 
        return this.stem.properties.attributes.haveOwnProperty(name)
    },
    

    getMethod : function (name) {
        return this.stem.properties.methods.getProperty(name)
    },
    
    
    getAttribute : function (name) {
        return this.stem.properties.attributes.getProperty(name)
    },
    
    
    eachRole : function (roles, func, scope) {
        Joose.A.each(roles, function (arg, index) {
            var role = (arg.meta instanceof Joose.Managed.Class) ? arg : arg.role
            
            func.call(scope || this, arg, role, index)
        }, this)
    },
    
    
    addRole : function () {
        
        this.eachRole(arguments, function (arg, role) {
            
            this.beforeRoleAdd(role)
            
            var desc = arg
            
            //compose descriptor can contain 'alias' and 'exclude' fields, in this case actual reference should be stored
            //into 'propertySet' field
            if (role != arg) {
                desc.propertySet = role.meta.stem
                delete desc.role
            } else
                desc = desc.meta.stem
            
            this.stem.addComposeInfo(desc)
            
        }, this)
    },
    
    
    beforeRoleAdd : function (role) {
        var roleMeta = role.meta
        
        if (roleMeta.builderClassCreated) this.getBuilderTarget().meta.extend({
            does : [ roleMeta.getBuilderTarget() ]
        })
        
        if (roleMeta.stemClassCreated) this.getStemTarget().meta.extend({
            does : [ roleMeta.getStemTarget() ]
        })
        
        if (roleMeta.meta.isDetached && !this.firstPass) this.builder.traits(this, roleMeta.constructor)
    },
    
    
    beforeRoleRemove : function (role) {
        var roleMeta = role.meta
        
        if (roleMeta.builderClassCreated) this.getBuilderTarget().meta.extend({
            doesnt : [ roleMeta.getBuilderTarget() ]
        })
        
        if (roleMeta.stemClassCreated) this.getStemTarget().meta.extend({
            doesnt : [ roleMeta.getStemTarget() ]
        })
        
        if (roleMeta.meta.isDetached && !this.firstPass) this.builder.removeTraits(this, roleMeta.constructor)
    },
    
    
    removeRole : function () {
        this.eachRole(arguments, function (arg, role) {
            this.beforeRoleRemove(role)
            
            this.stem.removeComposeInfo(role.meta.stem)
        }, this)
    },
    
    
    getRoles : function () {
        
        return Joose.A.map(this.stem.composedFrom, function (composeDesc) {
            //compose descriptor can contain 'alias' and 'exclude' fields, in this case actual reference is stored
            //into 'propertySet' field
            if (!(composeDesc instanceof Joose.Managed.PropertySet)) return composeDesc.propertySet
            
            return composeDesc.targetMeta.c
        })
    },
    
    
    does : function (role) {
        var myRoles = this.getRoles()
        
        for (var i = 0; i < myRoles.length; i++) if (role == myRoles[i]) return true
        for (var i = 0; i < myRoles.length; i++) if (myRoles[i].meta.does(role)) return true
        
        var superMeta = this.superClass.meta
        
        // considering the case of inheriting from non-Joose classes
        if (this.superClass != Joose.Proto.Empty && superMeta && superMeta.meta && superMeta.meta.hasMethod('does')) return superMeta.does(role)
        
        return false
    },
    
    
    getMethods : function () {
        return this.stem.properties.methods
    },
    
    
    getAttributes : function () {
        return this.stem.properties.attributes
    },
    
    
    afterMutate : function () {
    },
    
    
    getCurrentMethod : function () {
        for (var wrapper = arguments.callee.caller, count = 0; wrapper && count < 5; wrapper = wrapper.caller, count++)
            if (wrapper.__METHOD__) return wrapper.__METHOD__
        
        return null
    }
    
    
}).c;
Joose.Managed.Role = new Joose.Managed.Class('Joose.Managed.Role', {
    
    isa                         : Joose.Managed.Class,
    
    have : {
        defaultSuperClass       : Joose.Proto.Empty,
        
        builderRole             : null,
        stemRole                : null
    },
    
    
    methods : {
        
        defaultConstructor : function () {
            return function () {
                throw new Error("Roles cant be instantiated")
            }
        },
        

        processSuperClass : function () {
            if (this.superClass != this.defaultSuperClass) throw new Error("Roles can't inherit from anything")
        },
        
        
        getBuilderTarget : function () {
            if (!this.builderRole) {
                this.builderRole = new this.constructor().c
                this.builderClassCreated = true
            }
            
            return this.builderRole
        },
        
    
        getStemTarget : function () {
            if (!this.stemRole) {
                this.stemRole = new this.constructor().c
                this.stemClassCreated = true
            }
            
            return this.stemRole
        },
        
    
        addRequirement : function (methodName) {
            this.stem.properties.requirements.addProperty(methodName, {})
        }
        
    },
    

    stem : {
        methods : {
            
            apply : function () {
            },
            
            
            unapply : function () {
            }
        }
    },
    
    
    builder : {
        methods : {
            requires : function (targetClassMeta, info) {
                Joose.A.each(Joose.O.wantArray(info), function (methodName) {
                    targetClassMeta.addRequirement(methodName)
                }, this)
            }
        }
    }
    
}).c;
Joose.Managed.Attribute = new Joose.Managed.Class('Joose.Managed.Attribute', {
    
    isa : Joose.Managed.Property.Attribute,
    
    have : {
        is              : null,
        
        builder         : null,
        
        isPrivate       : false,
        
        role            : null,
        
        publicName      : null,
        setterName      : null,
        getterName      : null,
        
        //indicates the logical readableness/writeableness of the attribute
        readable        : false,
        writeable       : false,
        
        //indicates the physical presense of the accessor (may be absent for "combined" accessors for example)
        hasGetter       : false,
        hasSetter       : false,
        
        required        : false,
        
        canInlineSetRaw : true,
        canInlineGetRaw : true
    },
    
    
    after : {
        initialize : function () {
            var name = this.name
            
            this.publicName = name.replace(/^_+/, '')
            
            this.slot = this.isPrivate ? '$$' + name : name
            
            this.setterName = this.setterName || this.getSetterName()
            this.getterName = this.getterName || this.getGetterName()
            
            this.readable  = this.hasGetter = /^r/i.test(this.is)
            this.writeable = this.hasSetter = /^.w/i.test(this.is)
        }
    },
    
    
    override : {
        
        computeValue : function () {
            var init    = this.init
            
            if (Joose.O.isClass(init) || !Joose.O.isFunction(init)) this.SUPER()
        },
        
        
        preApply : function (targetClass) {
            targetClass.meta.extend({
                methods : this.getAccessorsFor(targetClass)
            })
        },
        
        
        postUnApply : function (from) {
            from.meta.extend({
                removeMethods : this.getAccessorsFrom(from)
            })
        }
        
    },
    
    
    methods : {
        
        getAccessorsFor : function (targetClass) {
            var targetMeta = targetClass.meta
            var setterName = this.setterName
            var getterName = this.getterName
            
            var methods = {}
            
            if (this.hasSetter && !targetMeta.hasMethod(setterName)) {
                methods[setterName] = this.getSetter()
                methods[setterName].ACCESSOR_FROM = this
            }
            
            if (this.hasGetter && !targetMeta.hasMethod(getterName)) {
                methods[getterName] = this.getGetter()
                methods[getterName].ACCESSOR_FROM = this
            }
            
            return methods
        },
        
        
        getAccessorsFrom : function (from) {
            var targetMeta = from.meta
            var setterName = this.setterName
            var getterName = this.getterName
            
            var setter = this.hasSetter && targetMeta.getMethod(setterName)
            var getter = this.hasGetter && targetMeta.getMethod(getterName)
            
            var removeMethods = []
            
            if (setter && setter.value.ACCESSOR_FROM == this) removeMethods.push(setterName)
            if (getter && getter.value.ACCESSOR_FROM == this) removeMethods.push(getterName)
            
            return removeMethods
        },
        
        
        getGetterName : function () {
            return 'get' + Joose.S.uppercaseFirst(this.publicName)
        },


        getSetterName : function () {
            return 'set' + Joose.S.uppercaseFirst(this.publicName)
        },
        
        
        getSetter : function () {
            var me      = this
            var slot    = me.slot
            
            if (me.canInlineSetRaw)
                return function (value) {
                    this[ slot ] = value
                    
                    return this
                }
            else
                return function () {
                    return me.setRawValueTo.apply(this, arguments)
                }
        },
        
        
        getGetter : function () {
            var me      = this
            var slot    = me.slot
            
            if (me.canInlineGetRaw)
                return function (value) {
                    return this[ slot ]
                }
            else
                return function () {
                    return me.getRawValueFrom.apply(this, arguments)
                }
        },
        
        
        getValueFrom : function (instance) {
            var getterName      = this.getterName
            
            if (this.readable && instance.meta.hasMethod(getterName)) return instance[ getterName ]()
            
            return this.getRawValueFrom(instance)
        },
        
        
        setValueTo : function (instance, value) {
            var setterName      = this.setterName
            
            if (this.writeable && instance.meta.hasMethod(setterName)) 
                instance[ setterName ](value)
            else
                this.setRawValueTo(instance, value)
        },
        
        
        initFromConfig : function (instance, config) {
            var name            = this.name
            
            var value, isSet = false
            
            if (config.hasOwnProperty(name)) {
                value = config[name]
                isSet = true
            } else {
                var init    = this.init
                
                // simple function (not class) has been used as "init" value
                if (Joose.O.isFunction(init) && !Joose.O.isClass(init)) {
                    
                    value = init.call(instance, config, name)
                    
                    isSet = true
                    
                } else if (this.builder) {
                    
                    value = instance[ this.builder.replace(/^this\./, '') ](config, name)
                    isSet = true
                }
            }
            
            if (isSet)
                this.setRawValueTo(instance, value)
            else 
                if (this.required) throw new Error("Required attribute [" + name + "] is missed during initialization of " + instance)
        }
    }

}).c
;
Joose.Managed.Attribute.Builder = new Joose.Managed.Role('Joose.Managed.Attribute.Builder', {
    
    
    have : {
        defaultAttributeClass : Joose.Managed.Attribute
    },
    
    builder : {
        
        methods : {
            
            has : function (targetClassMeta, info) {
                Joose.O.eachOwn(info, function (props, name) {
                    if (typeof props != 'object' || props == null || props.constructor == / /.constructor) props = { init : props }
                    
                    props.meta = props.meta || targetClassMeta.defaultAttributeClass
                    
                    if (/^__/.test(name)) {
                        name = name.replace(/^_+/, '')
                        
                        props.isPrivate = true
                    }
                    
                    targetClassMeta.addAttribute(name, props.init, props)
                }, this)
            },
            
            
            hasnot : function (targetClassMeta, info) {
                this.havenot(targetClassMeta, info)
            },
            
            
            hasnt : function (targetClassMeta, info) {
                this.hasnot(targetClassMeta, info)
            }
        }
            
    }
    
}).c
;
Joose.Managed.My = new Joose.Managed.Role('Joose.Managed.My', {
    
    have : {
        myClass                         : null,
        
        needToReAlias                   : false
    },
    
    
    methods : {
        createMy : function (extend) {
            var thisMeta = this.meta
            var isRole = this instanceof Joose.Managed.Role
            
            var myExtend = extend.my || {}
            delete extend.my
            
            // Symbiont will generally have the same meta class as its hoster, excepting the cases, when the superclass also have the symbiont. 
            // In such cases, the meta class for symbiont will be inherited (unless explicitly specified)
            
            var superClassMy    = this.superClass.meta.myClass
            
            if (!isRole && !myExtend.isa && superClassMy) myExtend.isa = superClassMy
            

            if (!myExtend.meta && !myExtend.isa) myExtend.meta = this.constructor
            
            var createdClass    = this.myClass = Class(myExtend)
            
            var c               = this.c
            
            c.prototype.my      = c.my = isRole ? createdClass : new createdClass({ HOST : c })
            
            this.needToReAlias = true
        },
        
        
        aliasStaticMethods : function () {
            this.needToReAlias = false
            
            var c           = this.c
            var myProto     = this.myClass.prototype
            
            Joose.O.eachOwn(c, function (property, name) {
                if (property.IS_ALIAS) delete c[ name ] 
            })
            
            this.myClass.meta.stem.properties.methods.each(function (method, name) {
                
                if (!c[ name ])
                    (c[ name ] = function () {
                        return myProto[ name ].apply(c.my, arguments)
                    }).IS_ALIAS = true
            })
        }
    },
    
    
    override : {
        
        extend : function (props) {
            var myClass = this.myClass
            
            if (!myClass && this.superClass.meta.myClass) this.createMy(props)
            
            if (props.my) {
                if (!myClass) 
                    this.createMy(props)
                else {
                    this.needToReAlias = true
                    
                    myClass.meta.extend(props.my)
                    delete props.my
                }
            }
            
            this.SUPER(props)
            
            if (this.needToReAlias && !(this instanceof Joose.Managed.Role)) this.aliasStaticMethods()
        }  
    },
    
    
    before : {
        
        addRole : function () {
            var myStem
            
            Joose.A.each(arguments, function (arg) {
                
                if (!arg) throw new Error("Attempt to consume an undefined Role into [" + this.name + "]")
                
                //instanceof Class to allow treat classes as roles
                var role = (arg.meta instanceof Joose.Managed.Class) ? arg : arg.role
                
                if (role.meta.meta.hasAttribute('myClass') && role.meta.myClass) {
                    
                    if (!this.myClass) {
                        this.createMy({
                            my : {
                                does : role.meta.myClass
                            }
                        })
                        return
                    }
                    
                    myStem = this.myClass.meta.stem
                    if (!myStem.opened) myStem.open()
                    
                    myStem.addComposeInfo(role.my.meta.stem)
                }
            }, this)
            
            if (myStem) {
                myStem.close()
                
                this.needToReAlias = true
            }
        },
        
        
        removeRole : function () {
            if (!this.myClass) return
            
            var myStem = this.myClass.meta.stem
            myStem.open()
            
            Joose.A.each(arguments, function (role) {
                if (role.meta.meta.hasAttribute('myClass') && role.meta.myClass) {
                    myStem.removeComposeInfo(role.my.meta.stem)
                    
                    this.needToReAlias = true
                }
            }, this)
            
            myStem.close()
        }
        
    }
    
}).c;
Joose.Namespace = Joose.stub()

Joose.Namespace.Able = new Joose.Managed.Role('Joose.Namespace.Able', {

    have : {
        bodyFunc                : null
    },
    
    
    before : {
        extend : function (extend) {
            if (extend.body) {
                this.bodyFunc = extend.body
                delete extend.body
            }
        }
    },
    
    
    after: {
        
        afterMutate : function () {
            var bodyFunc = this.bodyFunc
            delete this.bodyFunc
            
            if (bodyFunc) Joose.Namespace.Manager.my.executeIn(this.c, bodyFunc)
        }
    }
    
}).c;
Joose.Managed.Bootstrap = new Joose.Managed.Role('Joose.Managed.Bootstrap', {
    
    does   : [ Joose.Namespace.Able, Joose.Managed.My, Joose.Managed.Attribute.Builder ]
    
}).c
;
Joose.Meta = Joose.stub()


Joose.Meta.Object = new Joose.Proto.Class('Joose.Meta.Object', {
    
    isa             : Joose.Proto.Object
    
}).c


;
Joose.Meta.Class = new Joose.Managed.Class('Joose.Meta.Class', {
    
    isa                         : Joose.Managed.Class,
    
    does                        : Joose.Managed.Bootstrap,
    
    have : {
        defaultSuperClass       : Joose.Meta.Object
    }
    
}).c

;
Joose.Meta.Role = new Joose.Meta.Class('Joose.Meta.Role', {
    
    isa                         : Joose.Managed.Role,
    
    does                        : Joose.Managed.Bootstrap
    
}).c;
Joose.Namespace.Keeper = new Joose.Meta.Class('Joose.Namespace.Keeper', {
    
    isa         : Joose.Meta.Class,
    
    have        : {
        externalConstructor             : null
    },
    
    
    methods: {
        
        defaultConstructor: function () {
            
            return function () {
                //constructors should assume that meta is attached to 'arguments.callee' (not to 'this') 
                var thisMeta = arguments.callee.meta
                
                if (thisMeta instanceof Joose.Namespace.Keeper) throw new Error("Module [" + thisMeta.c + "] may not be instantiated. Forgot to 'use' the class with the same name?")
                
                var externalConstructor = thisMeta.externalConstructor
                
                if (typeof externalConstructor == 'function') {
                    
                    externalConstructor.meta = thisMeta
                    
                    return externalConstructor.apply(this, arguments)
                }
                
                throw "NamespaceKeeper of [" + thisMeta.name + "] was planted incorrectly."
            }
        },
        
        
        //withClass should be not constructed yet on this stage (see Joose.Proto.Class.construct)
        //it should be on the 'constructorOnly' life stage (should already have constructor)
        plant: function (withClass) {
            var keeper = this.c
            
            keeper.meta = withClass.meta
            
            keeper.meta.c = keeper
            keeper.meta.externalConstructor = withClass
        }
    }
    
}).c


;
Joose.Namespace.Manager = new Joose.Managed.Class('Joose.Namespace.Manager', {
    
    have : {
        current     : null
    },
    
    
    methods : {
        
        initialize : function () {
            this.current    = [ Joose.top ]
        },
        
        
        getCurrent: function () {
            return this.current[0]
        },
        
        
        executeIn : function (ns, func) {
            var current = this.current
            
            current.unshift(ns)
            var res = func.call(ns, ns)
            current.shift()
            
            return res
        },
        
        
        earlyCreate : function (name, metaClass, props) {
            props.constructorOnly = true
            
            return new metaClass(name, props).c
        },
        
        
        //this function establishing the full "namespace chain" (including the last element)
        create : function (nsName, metaClass, extend) {
            
            //if no name provided, then we creating an anonymous class, so just skip all the namespace manipulations
            if (!nsName) return new metaClass(nsName, extend).c
            
            var me = this
            
            if (/^\./.test(nsName)) return this.executeIn(Joose.top, function () {
                return me.create(nsName.replace(/^\./, ''), metaClass, extend)
            })
            
            var props   = extend || {}
            
            var parts   = Joose.S.saneSplit(nsName, '.')
            var object  = this.getCurrent()
            var soFar   = object == Joose.top ? [] : Joose.S.saneSplit(object.meta.name, '.')
            
            for (var i = 0; i < parts.length; i++) {
                var part        = parts[i]
                var isLast      = i == parts.length - 1
                
                if (part == "meta" || part == "my" || !part) throw "Module name [" + nsName + "] may not include a part called 'meta' or 'my' or empty part."
                
                var cur =   object[part]
                
                soFar.push(part)
                
                var soFarName       = soFar.join(".")
                var needFinalize    = false
                var nsKeeper
                
                // if the namespace segment is empty
                if (typeof cur == "undefined") {
                    if (isLast) {
                        // perform "early create" which just fills the namespace segment with right constructor
                        // this allows us to have a right constructor in the namespace segment when the `body` will be called
                        nsKeeper        = this.earlyCreate(soFarName, metaClass, props)
                        needFinalize    = true
                    } else
                        nsKeeper        = new Joose.Namespace.Keeper(soFarName).c
                    
                    object[part] = nsKeeper
                    
                    cur = nsKeeper
                    
                } else if (isLast && cur && cur.meta) {
                    
                    var currentMeta = cur.meta
                    
                    if (metaClass == Joose.Namespace.Keeper)
                        //`Module` over something case - extend the original
                        currentMeta.extend(props)
                    else {
                        
                        if (currentMeta instanceof Joose.Namespace.Keeper) {
                            
                            currentMeta.plant(this.earlyCreate(soFarName, metaClass, props))
                            
                            needFinalize = true
                        } else
                            throw new Error("Double declaration of [" + soFarName + "]")
                    }
                    
                } else 
                    if (isLast && !(cur && cur.meta && cur.meta.meta)) throw "Trying to setup module " + soFarName + " failed. There is already something: " + cur

                // hook to allow embedd resource into meta
                if (isLast) this.prepareMeta(cur.meta)
                    
                if (needFinalize) cur.meta.construct(props)
                    
                object = cur
            }
            
            return object
        },
        
        
        prepareMeta : function () {
        },
        
        
        prepareProperties : function (name, props, defaultMeta, callback) {
            if (name && typeof name != 'string') {
                props   = name
                name    = null
            }
            
            var meta
            
            if (props && props.meta) {
                meta = props.meta
                delete props.meta
            }
            
            if (!meta)
                if (props && typeof props.isa == 'function' && props.isa.meta)
                    meta = props.isa.meta.constructor
                else
                    meta = defaultMeta
            
            return callback.call(this, name, meta, props)
        },
        
        
        getDefaultHelperFor : function (metaClass) {
            var me = this
            
            return function (name, props) {
                return me.prepareProperties(name, props, metaClass, function (name, meta, props) {
                    return me.create(name, meta, props)
                })
            }
        },
        
        
        register : function (helperName, metaClass, func) {
            var me = this
            
            if (this.meta.hasMethod(helperName)) {
                
                var helper = function () {
                    return me[ helperName ].apply(me, arguments)
                }
                
                if (!Joose.top[ helperName ])   Joose.top[ helperName ]         = helper
                if (!Joose[ helperName ])       Joose[ helperName ]             = helper
                
                if (Joose.is_NodeJS && typeof exports != 'undefined')            exports[ helperName ]    = helper
                
            } else {
                var methods = {}
                
                methods[ helperName ] = func || this.getDefaultHelperFor(metaClass)
                
                this.meta.extend({
                    methods : methods
                })
                
                this.register(helperName)
            }
        },
        
        
        Module : function (name, props) {
            return this.prepareProperties(name, props, Joose.Namespace.Keeper, function (name, meta, props) {
                if (typeof props == 'function') props = { body : props }    
                
                return this.create(name, meta, props)
            })
        }
    }
    
}).c

Joose.Namespace.Manager.my = new Joose.Namespace.Manager()

Joose.Namespace.Manager.my.register('Class', Joose.Meta.Class)
Joose.Namespace.Manager.my.register('Role', Joose.Meta.Role)
Joose.Namespace.Manager.my.register('Module')


// for the rest of the package
var Class       = Joose.Class
var Role        = Joose.Role
;
Role('Joose.Attribute.Delegate', {
    
    have : {
        handles : null
    },
    
    
    override : {
        
        eachDelegate : function (handles, func, scope) {
            if (typeof handles == 'string') return func.call(scope, handles, handles)
            
            if (handles instanceof Array)
                return Joose.A.each(handles, function (delegateTo) {
                    
                    func.call(scope, delegateTo, delegateTo)
                })
                
            if (handles === Object(handles))
                Joose.O.eachOwn(handles, function (delegateTo, handleAs) {
                    
                    func.call(scope, handleAs, delegateTo)
                })
        },
        
        
        getAccessorsFor : function (targetClass) {
            var targetMeta  = targetClass.meta
            var methods     = this.SUPER(targetClass)
            
            var me      = this
            
            this.eachDelegate(this.handles, function (handleAs, delegateTo) {
                
                if (!targetMeta.hasMethod(handleAs)) {
                    var handler = methods[ handleAs ] = function () {
                        var attrValue = me.getValueFrom(this)
                        
                        return attrValue[ delegateTo ].apply(attrValue, arguments)
                    }
                    
                    handler.ACCESSOR_FROM = me
                }
            })
            
            return methods
        },
        
        
        getAccessorsFrom : function (from) {
            var methods = this.SUPER(from)
            
            var me          = this
            var targetMeta  = from.meta
            
            this.eachDelegate(this.handles, function (handleAs) {
                
                var handler = targetMeta.getMethod(handleAs)
                
                if (handler && handler.value.ACCESSOR_FROM == me) methods.push(handleAs)
            })
            
            return methods
        }
    }
})

;
Role('Joose.Attribute.Trigger', {
    
    have : {
        trigger        : null
    }, 

    
    after : {
        initialize : function() {
            if (this.trigger) {
                if (!this.writeable) throw new Error("Can't use `trigger` for read-only attributes")
                
                this.hasSetter = true
            }
        }
    },
    
    
    override : {
        
        getSetter : function() {
            var original    = this.SUPER()
            var trigger     = this.trigger
            
            if (!trigger) return original
            
            var me      = this
            var init    = Joose.O.isFunction(me.init) ? null : me.init
            
            return function () {
                var oldValue    = me.hasValue(this) ? me.getValueFrom(this) : init
                
                var res         = original.apply(this, arguments)
                
                trigger.call(this, me.getValueFrom(this), oldValue)
                
                return res
            }
        }
    }
})    

;
Role('Joose.Attribute.Lazy', {
    
    
    have : {
        lazy        : null
    }, 
    
    
    before : {
        computeValue : function () {
            if (typeof this.init == 'function' && this.lazy) {
                this.lazy = this.init    
                delete this.init    
            }
        }
    },
    
    
    after : {
        initialize : function () {
            if (this.lazy) this.readable = this.hasGetter = true
        }
    },
    
    
    override : {
        
        getGetter : function () {
            var original    = this.SUPER()
            var lazy        = this.lazy
            
            if (!lazy) return original
            
            var me      = this    
            
            return function () {
                if (!me.hasValue(this)) {
                    var initializer = typeof lazy == 'function' ? lazy : this[ lazy.replace(/^this\./, '') ]
                    
                    me.setValueTo(this, initializer.apply(this, arguments))
                }
                
                return original.call(this)    
            }
        }
    }
})

;
Role('Joose.Attribute.Accessor.Combined', {
    
    
    have : {
        isCombined        : false
    }, 
    
    
    after : {
        initialize : function() {
            this.isCombined = this.isCombined || /..c/i.test(this.is)
            
            if (this.isCombined) {
                this.slot = '$$' + this.name
                
                this.hasGetter = true
                this.hasSetter = false
                
                this.setterName = this.getterName = this.publicName
            }
        }
    },
    
    
    override : {
        
        getGetter : function() {
            var getter    = this.SUPER()
            
            if (!this.isCombined) return getter
            
            var setter    = this.getSetter()
            
            var me = this
            
            return function () {
                
                if (!arguments.length) {
                    if (me.readable) return getter.call(this)
                    throw new Error("Call to getter of unreadable attribute: [" + me.name + "]")
                }
                
                if (me.writeable) return setter.apply(this, arguments)
                
                throw new Error("Call to setter of read-only attribute: [" + me.name + "]")    
            }
        }
    }
    
})

;
Joose.Managed.Attribute.meta.extend({
    does : [ Joose.Attribute.Delegate, Joose.Attribute.Trigger, Joose.Attribute.Lazy, Joose.Attribute.Accessor.Combined ]
})            

;
Role('Joose.Meta.Singleton', {
    
    has : {
        forceInstance           : Joose.I.Object,
        instance                : null
    },
    
    
    
    override : {
        
        defaultConstructor : function () {
            var meta        = this
            var previous    = this.SUPER()
            
            this.adaptConstructor(previous)
            
            return function (forceInstance, params) {
                if (forceInstance == meta.forceInstance) return previous.apply(this, params) || this
                
                var instance = meta.instance
                
                if (instance) {
                    if (meta.hasMethod('configure')) instance.configure.apply(instance, arguments)
                } else
                    meta.instance = new meta.c(meta.forceInstance, arguments)
                    
                return meta.instance
            }
        }        
    }
    

})


Joose.Namespace.Manager.my.register('Singleton', Class({
    isa     : Joose.Meta.Class,
    meta    : Joose.Meta.Class,
    
    does    : Joose.Meta.Singleton
}))
;
;
}();;
;
Class('Scope.Provider', {
    
    /*PKGVERSION*/VERSION : 0.12,
    
    has     : {
        scope               : null,
        
        seedingCode         : null,
        seedingScript       : null,
        
        preload             : {
            is      : 'ro',
            init    : Joose.I.Array
        },
        
        cleanupCallback     : null
    },
    
        
    methods : {
        
        isCSS : function (url) {
            return /\.css(\?.*)?$/i.test(url)
        },
        
        
        isAlreadySetUp : function () {
            return Boolean(this.scope)
        },
        
        
        addPreload : function (preloadDesc) {
            if (this.isAlreadySetUp()) throw new Error("Can't use `addPreload` - scope is already setup. Use `runCode/runScript` instead")
            
            if (typeof preloadDesc == 'string')
                
                if (this.isCSS(preloadDesc)) 
                    preloadDesc = {
                        type        : 'css',
                        url         : preloadDesc
                    }
                else
                    preloadDesc = {
                        type        : 'js',
                        url         : preloadDesc
                    }
            else
            
                if (preloadDesc.text) 
                    preloadDesc = {
                        type        : 'js',
                        content     : preloadDesc.text
                    }
                    
            if (!preloadDesc.type) throw new Error("Preload descriptor must have the `type` property")
                
            this.preload.push(preloadDesc)
        },
        
        
        addOnErrorHandler : function (handler, callback) {
            throw "Abstract method `addOnErrorHandler` of Scope.Provider called"
        },
        
        
        create : function () {
            throw "Abstract method `create` of Scope.Provider called"
        },
        
        
        setup : function (callback) {
            throw "Abstract method `setup` of Scope.Provider called"
        },
        
        
        cleanup : function () {
            throw "Abstract method `cleanup` of Scope.Provider called"
        },
        
        
        runCode : function (text, callback) {
            throw "Abstract method `runCode` of Scope.Provider called"
        },
        
        
        runScript : function (url, callback) {
            throw "Abstract method `runScript` of Scope.Provider called"
        }
    }
})


Scope.Provider.__ONLOAD__   = {}
Scope.Provider.__ONERROR__  = {};
Role('Scope.Provider.Role.WithDOM', {
    
    requires    : [ 'getDocument', 'create', 'getPreload', 'isAlreadySetUp' ],
    
    has : {
        useStrictMode   : true,
        sourceURL       : null,
        
        minViewportSize : null,
        
        parentWindow    : function () { return window },
        scopeId         : function () { return Math.round(Math.random() * 1e10) },
        
        //                init function
        attachToOnError : function () {
            
            // returns the value of the attribute
            return function (window, scopeId, handler) {
                
                var prevHandler         = window.onerror
                if (prevHandler && prevHandler.__SP_MANAGED__) return
                
                window.onerror = function (message, url, lineNumber) {
                    // prevent recursive calls if other authors politely did not overwrite the handler and will call it
                    if (handler.__CALLING__) return
                    
                    handler.__CALLING__ = true
                    
                    prevHandler && prevHandler.apply(this, arguments)
                
                    handler.apply(this, arguments)
                    
                    handler.__CALLING__ = false
                    
                    // in FF/IE need to return `true` to prevent default action
                    return window.WebKitPoint ? false : true 
                }
                
                window.onerror.__SP_MANAGED__ = true
            } 
        },
        
        // this is a "cached" onerror handler - a handler which was provided before the scope
        // has started the creation process - should be installed ASAP in the creation process
        // to allow catching of the exceptions in the scope with `sourceURL` 
        cachedOnError   : null
    },
    
    
    before : {
        
        cleanup : function () {
            this.scope.onerror = null
            
            var scopeProvider = this.parentWindow.Scope.Provider
            
            delete scopeProvider.__ONLOAD__[ this.scopeId ]
            delete scopeProvider.__ONERROR__[ this.scopeId ]
        }
    },
    
        
    methods : {
        
        getHead : function () {
            return this.getDocument().getElementsByTagName('head')[ 0 ]
        },
        
        
        installOnErrorHandler : function (handler) {
            if (!this.isAlreadySetUp()) throw "Scope should be already set up"
            
            this.attachToOnError(this.scope, this.scopeId, handler)
        },
        
        
        addOnErrorHandler : function (handler) {
            handler.__SP_MANAGED__  = true
            
            if (this.cachedOnError && this.cachedOnError != handler) throw "Can only install one on error handler" 
            this.cachedOnError      = handler
            
            var scopeId     = this.scopeId
            
            this.parentWindow.Scope.Provider.__ONERROR__[ scopeId ] = handler
            
            var attachToOnError = ';(' + this.attachToOnError.toString() + ')(window, ' + scopeId + ', (window.opener || window.parent).Scope.Provider.__ONERROR__[ ' + scopeId + ' ]);'
            
            if (this.isAlreadySetUp()) 
                this.runCode(attachToOnError)
            else {
                // this is a fallback - run the "attachToOnError" from inside of scope
                this.getPreload().unshift({
                    type        : 'js',
                    content     : attachToOnError,
                    unordered   : true
                })
            }
        },
        
        
        addSeedingToPreload : function () {
            var preload             = this.getPreload()
                
            if (this.seedingCode) preload.unshift({
                type        : 'js',
                content     : this.seedingCode
            })
            
            if (this.seedingScript) preload.push({
                type        : 'js',
                url         : this.seedingScript
            })
        },
        
        
        setup : function (callback) {
            var isIE                = 'v' == '\v' || Boolean(this.parentWindow.msWriteProfilerMark)
//            var isOpera             = Object.prototype.toString.call(this.parentWindow.opera) == '[object Opera]'
            var hasInlineScript     = false
            
            Joose.A.each(this.getPreload(), function (preloadDesc) {
                // IE will execute the inline scripts ASAP, this might be not what we want (inline script might be need executed only after some url script)
                // its however ok in some cases (like adding `onerror` handler
                // such inline scripts should be marked with `unordered` - true
                if (preloadDesc.type == 'js' && preloadDesc.content && !preloadDesc.unordered) {
                    hasInlineScript = true
                    
                    return false
                } 
            })
            
            if (this.sourceURL || isIE && hasInlineScript) {
                this.addSeedingToPreload()
                
                this.setupIncrementally(callback)
                
            } else {
                // for sane browsers just add the seeding code and seeding script to preloads
                if (!isIE) this.addSeedingToPreload()
                
                // seeding scripts are included only for sane browsers (not IE)
                this.setupWithDocWrite(callback, isIE)
            }
        },
        
        
        setupWithDocWrite : function (callback, needToSeed) {
            var html        = []
            var me          = this
            
            Joose.A.each(this.getPreload(), function (preloadDesc) {
                
                if (preloadDesc.type == 'js') 
                    html.push(me.getScriptTagString(preloadDesc.url, preloadDesc.content))
                    
                else if (preloadDesc.type == 'css') 
                    html.push(me.getLinkTagString(preloadDesc.url, preloadDesc.content))
                
                else throw "Incorrect preload descriptor " + preloadDesc
            })
            
            // no need to wait for DOM ready - we'll overwrite it anyway
            this.create()
            
            var scopeId              = this.scopeId
            
            this.parentWindow.Scope.Provider.__ONLOAD__[ scopeId ]    = function () {

                var cont = function () { callback && callback(me) }
                
                // sane browsers - seeding code and script has been already added
                if (!needToSeed) { cont(); return }
                
                // our beloved IE - manually seeding the scope
                
                if (me.seedingCode) me.runCode(me.seedingCode)
                
                if (me.seedingScript) 
                    me.runScript(me.seedingScript, cont)
                else
                    cont()
            }
            
            var doc             = this.getDocument()
            
            doc.open()
            
            doc.write([
                this.useStrictMode ? '<!DOCTYPE html>' : '',
                '<html style="width: 100%; height: 100%; margin : 0; padding : 0;">',
                    '<head>',
                        html.join(''),
                    '</head>',
    
                    '<body style="margin : 0; padding : 0; width: 100%; height: 100%" onload="(window.opener || window.parent).Scope.Provider.__ONLOAD__[' + scopeId + ']()">',
                    '</body>',
                '</html>'
            ].join(''))
            
            doc.close()
            
            // Chrome (Webkit?) will clear the `onerror` after "doc.open()/.close()" so need to re-install it
            if (me.cachedOnError) me.installOnErrorHandler(me.cachedOnError)
        },
        
        
        setupIncrementally : function (callback) {
            var me      = this
            
            // here the "onerror" should be included early in the "preloads" 
            this.create(function () {
                
                var loadScripts     = function (preloads, callback) {
                    
                    var cont = function () { loadScripts(preloads, callback) }
                    
                    if (!preloads.length) 
                        callback && callback()
                    else {
                        var preloadDesc     = preloads.shift()
                        
                        if (preloadDesc.url) 
                            me.runScript(preloadDesc.url, cont)
                        else 
                            if (preloadDesc.type == 'js')
                                me.runCode(preloadDesc.content, cont)
                            else {
                                me.addStyleTag(preloadDesc.content)
                                
                                cont()
                            }
                    }
                }
                
                loadScripts(me.getPreload().slice(), callback)
            })
        },        
        
        
        getScriptTagString : function (url, text) {
            var res = '<script type="text/javascript"'
            
            if (url) 
                res     += ' src="' + url + '"></script>'
            else
                res     += '>' + text.replace(/<\/script>/gi, '\\x3C/script>') + '</script>'
                
            return res
        },
        
        
        getLinkTagString : function (url, text) {
            if (url) return '<link href="' + url + '" rel="stylesheet" type="text/css" />'
            
            if (text) return '<style>' + text + '</style>'
        },
        
        

        loadCSS : function (url, callback) {
            var doc         = this.getDocument()
            var link        = doc.createElement('link')
            
            link.type       = 'text/css'
            link.rel        = 'stylesheet'
            link.href       = url
        
            this.getHead().appendChild(link)
            
            var hasContinued    = false
            
            var cont            = function () {
                // just in case some crazy JS engine calls `onerror` even after node removal
                if (hasContinued) return
                hasContinued    = true
                clearTimeout(forcedTimeout)
                
                if (callback) callback()
                
                doc.body.removeChild(img)
            }
            
            var forcedTimeout   = setTimeout(cont, 3000)
        
            var img             = doc.createElement('img')
            
            img.onerror         = cont
        
            doc.body.appendChild(img)
            
            img.src             = url
        },
        
        
        runCode : function (text, callback) {
            this.getHead().appendChild(this.createScriptTag(text))
            
            callback && callback()
        },
        
        
        runScript : function (url, callback) {
            if (this.isCSS(url))
                this.loadCSS(url, callback)
            else
                this.getHead().appendChild(this.createScriptTag(null, url, callback))
        },
        
        
        createScriptTag : function (text, url, callback) {
            var node = this.getDocument().createElement("script")
            
            node.setAttribute("type", "text/javascript")
            
            if (url) node.setAttribute("src", url)
            
            if (text) node.text = text
            
            if (callback) node.onload = node.onreadystatechange = function() {
                if (!node.readyState || node.readyState == "loaded" || node.readyState == "complete" || node.readyState == 4 && node.status == 200) {
                    node.onload = node.onreadystatechange = null
                    
                    //surely for IE6..
                    if ('v' == '\v') 
                        setTimeout(callback, 0)
                    else
                        callback()
                }
            }
            
            return node
        },
        
        
        addStyleTag : function (text) {
            var document    = this.getDocument()
            var node        = document.createElement('style')
            
            node.setAttribute("type", "text/css")
            
            var head = document.getElementsByTagName('head')[0]
            head.appendChild(node)
            
            if (node.styleSheet) {   // IE
                node.styleSheet.cssText = text
            } else {                // the world
                node.appendChild(document.createTextNode(text))
            }
        }        
    }
})


/**

Name
====

Scope.Provider.Role.WithDOM - role for scope provider, which uses `script` tag for running the code.


SYNOPSIS
========

        Class('Scope.Provider.IFrame', {
            
            isa     : Scope.Provider,
            
            does    : Scope.Provider.Role.WithDOM,
            
            ...
        })

DESCRIPTION
===========

`Scope.Provider.Role.WithDOM` requires the implementation of the `getDocument` method, which should return the
document into which the `script` tags will be created.

In return, this role provides the implementation of `runCode` and `runScript`.




GETTING HELP
============

This extension is supported via github issues tracker: <http://github.com/SamuraiJack/Scope-Provider/issues>

For general Joose questions you can also visit [#joose](http://webchat.freenode.net/?randomnick=1&channels=joose&prompt=1) 
on irc.freenode.org or the forum at: <http://joose.it/forum>
 


SEE ALSO
========

Web page of this module: <http://github.com/SamuraiJack/Scope-Provider/>

General documentation for Joose: <http://joose.github.com/Joose>


BUGS
====

All complex software has bugs lurking in it, and this module is no exception.

Please report any bugs through the web interface at <http://github.com/SamuraiJack/Scope-Provider/issues>



AUTHORS
=======

Nickolay Platonov <nplatonov@cpan.org>





COPYRIGHT AND LICENSE
=====================

This software is Copyright (c) 2010 by Nickolay Platonov <nplatonov@cpan.org>.

This is free software, licensed under:

  The GNU Lesser General Public License, Version 3, June 2007

*/;
Class('Scope.Provider.IFrame', {
    
    isa     : Scope.Provider,
    
    does    : Scope.Provider.Role.WithDOM,
    
    
    have : {
        iframe          : null,
        
        parentEl        : null
    },
    

    methods : {
        
        getDocument : function () {
            return this.iframe.contentWindow.document
        },
        
        
        create : function (onLoadCallback) {
            var me      = this
            var self    = { self : this }
            var doc     = this.parentWindow.document
            var iframe  = this.iframe = doc.createElement('iframe')
            
            var minViewportSize     = this.minViewportSize
            
            iframe.style.width      = (minViewportSize && minViewportSize.width || 1024) + 'px'
            iframe.style.height     = (minViewportSize && minViewportSize.height || 768) + 'px'
            iframe.setAttribute('frameborder', 0)

            var ignoreOnLoad        = false    
            
            var callback = function () {
                if (ignoreOnLoad) return
                
                if (iframe.detachEvent) 
                    iframe.detachEvent('onload', callback)
                else
                    iframe.onload = null
                
                onLoadCallback && onLoadCallback(me)
            }
            
            if (iframe.attachEvent) 
                iframe.attachEvent('onload', callback)
            else
                iframe.onload = callback
            
            iframe.src = this.sourceURL || 'about:blank'
            
            ;(this.parentEl || doc.body).appendChild(iframe)
            
            var scope   = this.scope = iframe.contentWindow
            var doc     = this.getDocument()
            
            // dances with tambourine around the IE, somehow fixes the cross-domain limits
            if ('v' == '\v' || Boolean(this.parentWindow.msWriteProfilerMark)) {
                // only ignore the 1st call to callback when there is a `sourceURL` config
                // which will later be assigned to `iframe.src` and will trigger a new iframe loading
                if (this.sourceURL) ignoreOnLoad = true
                
                doc.open()
                doc.write('')
                doc.close()
                
                ignoreOnLoad = false
                
                iframe.onreadystatechange = function () {
                    if (iframe.readyState == 'complete') iframe.onreadystatechange = null
                    
                    // trying to add the "early" onerror handler on each "readyState" change
                    // for some mystical reasons can't use `me.installOnErrorHandler` need to inline the call
                    if (me.cachedOnError) me.attachToOnError(scope, me.scopeId, me.cachedOnError)
                }
                
                if (this.sourceURL) iframe.src = this.sourceURL
            }
            
            // trying to add the "early" onerror handler - installing it in this stage will only work in FF 
            // (other browsers will clear on varios stages)
            if (me.cachedOnError) me.installOnErrorHandler(me.cachedOnError)
        },
        
        
        cleanup : function () {
            var iframe      = this.iframe
            var win         = this.scope
            var me          = this
            
            iframe.style.display    = 'none'
            
            var onUnloadChecker = function () {
                if (!window.onunload) window.onunload = function () { return 'something' }
            }
            
            // add the `onunload` handler if there's no any - attempting to prevent browser from caching the iframe
            // trying to create the handler from inside of the scope
            this.runCode(';(' + onUnloadChecker.toString() + ')();')

            this.iframe     = null
            this.scope      = null

            // wait for 1000ms to allow time for possible `setTimeout` in the scope of iframe
            setTimeout(function () {
                
                // chaging the page, triggering `onunload` and hopefully preventing browser from caching the content of iframe
                iframe.src              = 'javascript:false'
                
                // wait again before removing iframe from the DOM, as recommended by some online sources
                setTimeout(function () {
                    ;(me.parentEl || me.parentWindow.document.body).removeChild(iframe)
                    
                    iframe  = null
                    win     = null
                    
                    if (me.cleanupCallback) me.cleanupCallback()
                    
                }, 1000)
            }, 1000)
        }
    }
})

/**

Name
====

Scope.Provider.IFrame - scope provider, which uses the iframe.


SYNOPSIS
========

        var provider = new Scope.Provider.IFrame()
        
        provider.setup(function () {
        
            if (provider.scope.SOME_GLOBAL == 'some_value') {
                ...
            }
            
            provider.runCode(text, callback)
            
            ...
            
            provider.runScript(url, callback)
            
            ...
            
            provider.cleanup()        
        })


DESCRIPTION
===========

`Scope.Provider.IFrame` is an implementation of the scope provider, which uses the iframe, 
to create a new scope.


ISA
===

[Scope.Provider](../Provider.html)


DOES
====

[Scope.Provider.Role.WithDOM](Role/WithDOM.html)



GETTING HELP
============

This extension is supported via github issues tracker: <http://github.com/SamuraiJack/Scope-Provider/issues>

You can also ask questions at IRC channel : [#joose](http://webchat.freenode.net/?randomnick=1&channels=joose&prompt=1)
 
Or the mailing list: <http://groups.google.com/group/joose-js>
 


SEE ALSO
========

Web page of this module: <http://github.com/SamuraiJack/Scope-Provider/>

General documentation for Joose: <http://joose.github.com/Joose>


BUGS
====

All complex software has bugs lurking in it, and this module is no exception.

Please report any bugs through the web interface at <http://github.com/SamuraiJack/Scope-Provider/issues>



AUTHORS
=======

Nickolay Platonov <nplatonov@cpan.org>





COPYRIGHT AND LICENSE
=====================

This software is Copyright (c) 2010 by Nickolay Platonov <nplatonov@cpan.org>.

This is free software, licensed under:

  The GNU Lesser General Public License, Version 3, June 2007

*/;
Class('Scope.Provider.Window', {
    
    isa     : Scope.Provider,

    does    : Scope.Provider.Role.WithDOM,
    
    
    has     : {
        popupWindow     : null
    },
    

    methods : {
        
        create : function (onLoadCallback) {
            var popup   = this.scope = this.popupWindow = this.parentWindow.open(this.sourceURL || 'about:blank', '_blank', "width=800,height=600")
            
            if (!popup) {
                alert('Please enable popups for the host with this test suite running: ' + this.parentWindow.location.host)
                throw 'Please enable popups for the host with this test suite running: ' + this.parentWindow.location.host
            }
            
            var isIE = 'v' == '\v' || Boolean(this.parentWindow.msWriteProfilerMark)
            
            // dances with tambourine around the IE
            if (isIE && !this.sourceURL) {
                var doc = this.getDocument()
                
                doc.open()
                doc.write('')
                doc.close()
            }
            
            // trying to add the "early" onerror handler - will probably only work in FF
            if (this.cachedOnError) this.installOnErrorHandler(this.cachedOnError)
            
            /*!
             * contentloaded.js
             *
             * Author: Diego Perini (diego.perini at gmail.com)
             * Summary: cross-browser wrapper for DOMContentLoaded
             * Updated: 20101020
             * License: MIT
             * Version: 1.2
             *
             * URL:
             * http://javascript.nwbox.com/ContentLoaded/
             * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
             *
             */
            
            // @win window reference
            // @fn function reference
            var contentLoaded = function (win, fn) {
            
                var done = false, top = true,
            
                doc = win.document, root = doc.documentElement,
            
                add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
                rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
                pre = doc.addEventListener ? '' : 'on',
            
                init = function(e) {
                    if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
                    
                    (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
                    
                    if (!done && (done = true)) fn.call(win, e.type || e);
                },
            
                poll = function() {
                    try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
                    
                    init('poll');
                };
            
                if (doc.readyState == 'complete') 
                    fn.call(win, 'lazy');
                else {
                    if (doc.createEventObject && root.doScroll) {
                        try { top = !win.frameElement; } catch(e) { }
                        if (top) poll();
                    }
                    doc[add](pre + 'DOMContentLoaded', init, false);
                    doc[add](pre + 'readystatechange', init, false);
                    win[add](pre + 'load', init, false);
                }
            }
            
            contentLoaded(popup, onLoadCallback || function () {})
        },
        
        
        getDocument : function () {
            return this.popupWindow.document
        },
        
        
        cleanup : function () {
            this.popupWindow.close()
            
            this.popupWindow = null
            
            if (this.cleanupCallback) this.cleanupCallback()
        }
    }
})

/**

Name
====

Scope.Provider.Window - scope provider, which uses the popup browser window.


SYNOPSIS
========

        var provider = new Scope.Provider.Window()
        
        provider.setup(function () {
        
            if (provider.scope.SOME_GLOBAL == 'some_value') {
                ...
            }
            
            provider.runCode(text, callback)
            
            ...
            
            provider.runScript(url, callback)
            
            ...
            
            provider.cleanup()        
        })


DESCRIPTION
===========

`Scope.Provider.Window` is an implementation of the scope provider, which uses the popup browser window, 
to create a new scope.


ISA
===

[Scope.Provider](../Provider.html)


DOES
====

[Scope.Provider.Role.WithDOM](Role/WithDOM.html)



GETTING HELP
============

This extension is supported via github issues tracker: <http://github.com/SamuraiJack/Scope-Provider/issues>

You can also ask questions at IRC channel : [#joose](http://webchat.freenode.net/?randomnick=1&channels=joose&prompt=1)
 
Or the mailing list: <http://groups.google.com/group/joose-js>
 


SEE ALSO
========

Web page of this module: <http://github.com/SamuraiJack/Scope-Provider/>

General documentation for Joose: <http://joose.github.com/Joose>


BUGS
====

All complex software has bugs lurking in it, and this module is no exception.

Please report any bugs through the web interface at <http://github.com/SamuraiJack/Scope-Provider/issues>



AUTHORS
=======

Nickolay Platonov <nplatonov@cpan.org>





COPYRIGHT AND LICENSE
=====================

This software is Copyright (c) 2010 by Nickolay Platonov <nplatonov@cpan.org>.

This is free software, licensed under:

  The GNU Lesser General Public License, Version 3, June 2007

*/;
Class('Scope.Provider.NodeJS', {
    
    isa     : Scope.Provider,

    
    has     : {
        sourceURL       : null
    },
    

    methods : {
        
        compile : function (module, content, filename) {
            var Module    = require('module')
            var path      = require('path')
            
            var self      = module;
            // remove shebang
            content       = content.replace(/^\#\!.*/, '');
        
            var modRequire     = function (path) {
                return self.require(path);
            }
        
            modRequire.resolve = function(request) {
                return Module._resolveFilename(request, self)[1];
            };
        
            Object.defineProperty(modRequire, 'paths', { get: function() {
                throw new Error('modRequire.paths is removed. Use ' +
                            'node_modules folders, or the NODE_PATH '+
                            'environment variable instead.');
            }});
        
            modRequire.main = process.mainModule;
        
            // Enable support to add extra extension types
            modRequire.extensions = Module._extensions;
            modRequire.registerExtension = function() {
                throw new Error('modRequire.registerExtension() removed. Use ' +
                            'modRequire.extensions instead.');
            };
        
            modRequire.cache = Module._cache;
        
            var dirname = path.dirname(filename);
        
            // create wrapper function
            var wrapper = Module.wrap(content);
            
            var compiledWrapper = require('vm').runInContext(wrapper, this.scope, filename);
            
            return compiledWrapper.apply(self.exports, [self.exports, modRequire, self, filename, dirname]);
        },        
        
        
        addOnErrorHandler : function (handler, callback) {
        },

        
        create : function (callback) {
            var vm          = require('vm')
            var sandbox     = {}

            Joose.O.extend(sandbox, {
//                __PROVIDER__    : true,
                
                process         : process,
                
                global          : sandbox,
                root            : root,
                
                setTimeout      : setTimeout,
                clearTimeout    : clearTimeout,
                setInterval     : setInterval,
                clearInterval   : clearInterval
//                ,
//                
//                __filename      : __filename,
//                __dirname       : __dirname,
//                module          : module
            })
            
            var scope       = this.scope    = vm.createContext(sandbox)
            
            callback && callback()
        },
        
        
        setup : function (callback) {
            this.create()
            
            var me      = this
            
            if (this.seedingCode) require('vm').runInContext(this.seedingCode, this.scope)
            
            Joose.A.each(this.getPreload(), function (preloadDesc) {
                
                if (preloadDesc.type == 'js')
                    if (preloadDesc.url)
                        me.runScript(preloadDesc.url)
                    else
                        me.runCode(preloadDesc.content)
            })
            
            if (this.seedingScript) {
                var Module          = require('module')
                var path            = require('path')
                
                var module          = new Module('./' + this.sourceURL, require.main)
                
                var filename        = module.filename = path.join(path.dirname(require.main.filename), this.sourceURL)
                
                var content         = require('fs').readFileSync(filename, 'utf8')
                // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
                // because the buffer-to-string conversion in `fs.readFileSync()`
                // translates it to FEFF, the UTF-16 BOM.
                if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1)
  
                this.compile(module, content, filename)
            }
            
            callback && callback()
        },
        
        
        runCode : function (text, callback) {
            var res = require('vm').runInContext(text, this.scope)
            
            callback && callback(res)
            
            return res
        },
        
        
        runScript : function (url, callback) {
            var content = require('fs').readFileSync(url, 'utf8')
            
            var res = require('vm').runInContext(content, this.scope, url)
            
            callback && callback(res)
            
            return res
        },
        
        
        cleanup : function () {
            if (this.cleanupCallback) this.cleanupCallback()
        }
    }
})


/**

Name
====

Scope.Provider.NodeJS - scope provider, which uses the `Script.runInNewContext` call of the NodeJS.


SYNOPSIS
========

        var provider = new Scope.Provider.NodeJS()
        
        provider.setup(function () {
        
            if (provider.scope.SOME_GLOBAL == 'some_value') {
                ...
            }
            
            provider.runCode(text, callback)
            
            ...
            
            provider.runScript(url, callback)
            
            ...
            
            provider.cleanup()        
        })


DESCRIPTION
===========

`Scope.Provider.NodeJS` is an implementation of the scope provider, 
which uses the `Script.runInNewContext` call of the NodeJS platform.


ISA
===

[Scope.Provider](../Provider.html)



GETTING HELP
============

This extension is supported via github issues tracker: <http://github.com/SamuraiJack/Scope-Provider/issues>

You can also ask questions at IRC channel : [#joose](http://webchat.freenode.net/?randomnick=1&channels=joose&prompt=1)
 
Or the mailing list: <http://groups.google.com/group/joose-js>
 


SEE ALSO
========

Web page of this module: <http://github.com/SamuraiJack/Scope-Provider/>

General documentation for Joose: <http://joose.github.com/Joose>


BUGS
====

All complex software has bugs lurking in it, and this module is no exception.

Please report any bugs through the web interface at <http://github.com/SamuraiJack/Scope-Provider/issues>



AUTHORS
=======

Nickolay Platonov <nplatonov@cpan.org>





COPYRIGHT AND LICENSE
=====================

This software is Copyright (c) 2010 by Nickolay Platonov <nplatonov@cpan.org>.

This is free software, licensed under:

  The GNU Lesser General Public License, Version 3, June 2007

*/;
;
Class('JooseX.Observable.Event', {
    
    has : {
        name        : { required : true },
        args        : { required : true },
        
        source      : { required : true },
        
        splat       : null,
        current     : null,
        
        bubbling    : true
    },
    
        
    methods : {
        
        stopPropagation : function () {
            this.bubbling = false
        }
    }
})


;
Class('JooseX.Observable.Listener', {

    has : {
        channel     : { required : true },
        eventName   : { required : true },
        
        func        : { required : true },
        scope       : null,
        
        single          : false,
        
        buffer          : null,
        bufferMax       : null,
        
        bufferStartedAt : null,
        bufferTimeout   : null,
        
        delayTimeout    : null,
        
        delay           : null
    },
    
        
    methods : {
        
        activate : function (event, args) {
            var me      = this
            
            if (me.buffer != null) {
                
                if (me.bufferMax != null)
                    if (!me.bufferStartedAt) 
                        me.bufferStartedAt = new Date()
                    else
                        if (new Date - me.bufferStartedAt > me.bufferMax) return
                
                        
                if (me.bufferTimeout) clearTimeout(me.bufferTimeout)
                
                me.bufferTimeout = setTimeout(function () {
                    
                    delete me.bufferStartedAt
                    delete me.bufferTimeout
                    
                    me.doActivate(event, args)
                    
                }, me.buffer)
                
                return
            }
            
            if (me.delay != null) {
                
                me.delayTimeout = setTimeout(function () {
                    
                    delete me.delayTimeout
                    
                    me.doActivate(event, args)
                    
                }, me.delay)
                
                return
            }
            
            return me.doActivate(event, args)
        },
        
        
        doActivate : function (event, args) {
            if (this.single) this.remove()
            
            return this.func.apply(this.scope || event.source, [ event ].concat(args) ) !== false
        },
        
        
        cancel  : function () {
            if (this.buffer) {
                clearTimeout(this.bufferTimeout)
                
                delete this.bufferTimeout
                delete this.bufferStartedAt
            }
            
            if (this.delay) clearTimeout(this.delayTimeout)
        },
        
        
        remove : function () {
            this.channel.removeListener(this)
        }
    }
})


;
Class('JooseX.Observable.Channel', {
    
    has : {
        channels    : Joose.I.Object,
        
        listeners   : Joose.I.Object
    },
    
        
    methods : {
        
        // (!) segments array will be destroyed in this method
        getListenersFor : function (segments, name, activators) {
            var listeners = this.listeners
            
            if (listeners[ '**' ]) {
                
                var splat       = segments.concat(name)
                
                Joose.A.each(listeners[ '**' ], function (listener) {
                    activators.push({
                        listener    : listener,
                        splat       : splat
                    })
                })
            }
            
            if (segments.length) {
                var next = this.getSingleChannel(segments.shift(), true)
                
                if (next) next.getListenersFor(segments, name, activators)
            } else {
                
                if (listeners[ '*' ])
                    Joose.A.each(listeners[ '*' ], function (listener) {
                        
                        activators.push({
                            listener    : listener,
                            splat       : name
                        })
                    })
                
                if (listeners[ name ])  
                    Joose.A.each(listeners[ name ], function (listener) {
                        
                        activators.push({
                            listener    : listener
                        })
                    })
            }
        },
        
        
        hasListenerFor : function (segments, name) {
            var listeners = this.listeners
            
            if (listeners[ '**' ] && listeners[ '**' ].length) return true
            
            if (segments.length)  {
                var next = this.getSingleChannel(segments.shift(), true)
                
                if (next) return next.hasListenerFor(segments, name)
                
            } else {
                
                if (listeners[ '*' ] && listeners[ '*' ].length) return true
                
                if (listeners[ name ] && listeners[ name ].length) return true  
            }
            
            return false
        },
        
        
        addListener : function (listener) {
            var eventName   = listener.eventName
            var listeners   = this.listeners
            
            listeners[ eventName ] = listeners[ eventName ] || []
            
            listeners[ eventName ].push(listener)
        },
        
        
        removeListener : function (listenerToRemove) {
            var eventListeners      = this.listeners[ listenerToRemove.eventName ]
            
            Joose.A.each(eventListeners, function (listener, index) {
                
                if (listener == listenerToRemove) {
                    
                    eventListeners.splice(index, 1)
                    
                    return false
                }
            })
        },
        
        
        removeListenerByHandler : function (eventName, func, scope) {
            var eventListeners      = this.listeners[ eventName ]
            
            Joose.A.each(eventListeners, function (listener, index) {
                
                if (listener.func == func && listener.scope == scope) {
                    
                    eventListeners.splice(index, 1)
                    
                    return false
                }
            })
        },
        
        
        getSingleChannel : function (name, doNotCreate) {
            var channels    = this.channels
            
            if (channels[ name ]) return channels[ name ]
            
            if (doNotCreate) return null
            
            return channels[ name ] = new JooseX.Observable.Channel()
        },
        
        
        // (!) segments array will be destroyed in this method
        getChannel : function (segments, doNotCreate) {
            if (!segments.length) return this
            
            var next    = this.getSingleChannel(segments.shift(), doNotCreate)
            
            if (doNotCreate && !next) return null
            
            return next.getChannel(segments, doNotCreate)
        }
    }
})


;
Role('JooseX.Observable', {
    
    /*PKGVERSION*/VERSION : 0.04,
    
//    use : [ 
//        'JooseX.Observable.Channel',    
//        'JooseX.Observable.Listener', 
//        'JooseX.Observable.Event'    
//    ],
    
    
//    trait   : 'JooseX.Observable.Meta',
    
    
    has : {
        rootChannel             : {
            is          : 'rw',
            init        : function () { return new JooseX.Observable.Channel() }
        },
        
        suspendCounter          : 0
    },
    
        
    methods : {
        
        getBubbleTarget : function () {
        },
        
        
        parseEventPath : function (path) {
            var channels    = path.split('/')
            var eventName   = channels.pop()
            
            if (channels.length && !channels[ 0 ]) channels.shift()
            
            return {
                channels        : channels,
                eventName       : eventName
            }
        },
        
        
        on : function (path, func, scope, options) {
            if (!func) throw "Not valid listener function provided when subsribing on event: " + path
            
            var parsed      = this.parseEventPath(path)
            var channel     = this.getRootChannel().getChannel(parsed.channels)
            
            var listener    = new JooseX.Observable.Listener(Joose.O.extend(options || {}, {
                channel     : channel,
                eventName   : parsed.eventName,
                
                func        : func,
                scope       : scope
            }))
            
            channel.addListener(listener)
            
            return listener
        },
        
        
        un : function (path, func, scope) {
            
            if (path instanceof JooseX.Observable.Listener) {
                
                path.remove()
                
                return
            }
            
            var parsed      = this.parseEventPath(path)
            var channel     = this.getRootChannel().getChannel(parsed.channels, true)
            
            if (channel) channel.removeListenerByHandler(parsed.eventName, func, scope)
        },
        
        
        emit : function () {
            return this.fireEvent.apply(this, arguments)
        },
        
        
        fireEvent : function (path) {
            if (this.suspendCounter) return
            
            var args        = Array.prototype.slice.call(arguments, 1)

            var event       = new JooseX.Observable.Event({
                name        : path,
                args        : args,
                
                source      : this
            }) 
            
            return this.propagateEvent(event, path, args)
        },
        
        
        propagateEvent : function (event, path, args) {
            if (this.suspendCounter) return
            
            var parsed      = this.parseEventPath(path)
            var eventName   = parsed.eventName
            
            if (!eventName == '*' || eventName == '**') throw new Error("Can't fire an empty event or event with `*`, `**` names ")
            
            var activators  = []
            
            this.getRootChannel().getListenersFor(parsed.channels, eventName, activators)
            
            var res             = true
            
            event.current       = this
            
            if (activators.length) Joose.A.each(activators, function (activator) {
                event.splat = activator.splat
                
                res = activator.listener.activate(event, args) !== false && res
            })
            
            if (event.bubbling) {
                
                var further = this.getBubbleTarget()
                
                if (further) res = further.propagateEvent(event, path, args) !== false && res
            } 
                
            return res
        },
        
        
        hasListenerFor : function (path) {
            var parsed      = this.parseEventPath(path)
            
            return this.getRootChannel().hasListenerFor(parsed.channels, parsed.eventName)
        },
        
        
        purgeListeners  : function () {
            this.rootChannel = new JooseX.Observable.Channel()
        },
        
        
        suspendEvents : function () {
            this.suspendCounter++
        },
        
        
        resumeEvents : function () {
            this.suspendCounter--
            
            if (this.suspendCounter < 0) this.suspendCounter = 0
        }
    }
});
;
/*
    http://www.JSON.org/json2.js
    2011-02-23

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false, regexp: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    "use strict";

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                this.getUTCFullYear()     + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' : gap ?
                '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
;
!function () {
    
    var REF      = 1    

    Class('Data.Visitor2', {
        
        has : {
            seenPlaceholder : {
                init        : {}
            },
            
            outOfDepthPlaceholder : {
                init        : {}
            },
            
            seen            : Joose.I.Object,
            
            maxDepth        : null
        },
            
        methods : {
            
            getClassNameFor : function (object) {
                if (Joose.O.isInstance(object))      return object.meta.name
                
                return Object.prototype.toString.call(object).replace(/^\[object /, '').replace(/\]$/, '')
            },
            
            
            getRefAdr : function () {
                return REF++
            },
            
            
            assignRefAdrTo : function (object) {
                if (!object.__REFADR__) 
                    if (Object.defineProperty)
                        Object.defineProperty(object, '__REFADR__', { value : REF++ })
                    else
                        object.__REFADR__ = REF++
                
                return object.__REFADR__
            },
                
                
            isSeen : function (object) {
                return object.__REFADR__ && this.seen.hasOwnProperty(object.__REFADR__)
            },
            
            
            markSeenAs : function (object, result) {
                return this.seen[ object.__REFADR__ ] = result
            },
            
            
            hasSeenResultFor : function (object) {
                var ref = object.__REFADR__
                
                return this.seen.hasOwnProperty(ref) && this.seen[ ref ] != this.seenPlaceholder
            },
            
            
            visit : function (value, depth) {
                // will be false for NaN values
                if (depth > this.maxDepth)
                    return this.visitOutOfDepthValue(value, depth + 1)
                else
                    if (Object(value) === value)
                        if (this.isSeen(value)) 
                            return this.visitSeen(value, depth + 1)
                        else                        
                            return this.visitNotSeen(value, depth + 1)
                    else
                        return this.visitValue(value, depth + 1)
            },
            
            
            visitOutOfDepthValue : function (value, depth) {
                return this.outOfDepthPlaceholder
            },
            
            
            visitValue : function (value, depth) {
                return value
            },
            
            
            visitSeen : function (value, depth) {
                return this.seen[ value.__REFADR__ ]
            },
            
            
            getInitialSeenMarker : function (object, depth) {
                return this.seenPlaceholder
            },
            
            
            visitNotSeen : function (object, depth) {
                this.assignRefAdrTo(object)
                
                this.markSeenAs(object, this.getInitialSeenMarker(object, depth))
    
                
                if (Joose.O.isInstance(object)) return this.markSeenAs(object, this.visitJooseInstance(object, depth))
                
                
                var methodName = 'visit' + this.getClassNameFor(object)
                
                if (!this.meta.hasMethod(methodName)) methodName = 'visitObject' 
                
                return this.markSeenAs(object, this[ methodName ](object, depth))
            },
            
            
            visitArray  : function (array, depth) {
                Joose.A.each(array, function (value, index) {
                    
                    this.visitArrayEntry(value, index, array, depth)
                    
                }, this)
                
                return array
            },
            
            
            visitArrayEntry  : function (entry, index, array, depth) {
                return this.visit(entry, depth)
            },
            
            
            visitObject : function (object, depth) {
                
                Joose.O.eachOwn(object, function (value, key) {
                    
                    if (key != '__REFADR__') {
                        this.visitObjectKey(key, value, object, depth)
                        this.visitObjectValue(value, key, object, depth)
                    }
                    
                }, this)
                
                return object
            },
            
            
            visitJooseInstance : function (value, depth) {
                return this.visitObject(value, depth)
            },
            
            
            visitObjectKey : function (key, value, object, depth) {
                return this.visitValue(key, depth)
            },
            
            
            visitObjectValue : function (value, key, object, depth) {
                return this.visit(value, depth)
            }
        },
        
        
        my : {
            
            has : {
                HOST        : null
            },
            
            
            methods : {
                
                visit : function (value, maxDepth) {
                    var visitor     = new this.HOST({
                        maxDepth        : maxDepth || Infinity
                    })
                    
                    return visitor.visit(value, 0)
                }
            }
        }
    })    
    
}()


;
;
;
Class('Siesta.Util.Serializer', {
    
    isa : Data.Visitor2,
    
    has     : {
        result                  : Joose.I.Array,
        manualEnum              : function () {
            for (var i in { toString : 1 }) return false
            
            return true
        }
    },
    
    
    methods : {
        
        assignRefAdrTo : function (object) {
            try {
                return this.SUPER(object)
            } catch (e) {
                if (!object.__REFADR__) object.__REFADR__ = this.getRefAdr()
            }
            
            return object.__REFADR__
        },
        
        
        write : function (str) {
            this.result.push(str)
        },
        
        
        visitOutOfDepthValue : function (value, depth) {
            this.write('...')
        },
        
        
        visitValue : function (value) {
            if (value == null)
                // `null` and `undefined`
                this.write(value + '')
            else
                this.write(typeof value == 'string' ? '"' + value.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"' : value + '')
        },
        
        
        visitObjectKey : function (key, value, object) {
            this.write('"' + key + '": ')
        },
        
        
        getClassNameFor : function (object) {
            if (object.nodeType != null && object.nodeName != null && object.tagName) return 'DOMElement'
            
            // trying to detect and not dive into global window
            if (object.document != null && object.location != null && object.location.href != null) return 'Window'
            
            return this.SUPER(object)
        },
        
        
        visitSeen : function (value, depth) {
            this.write('[Circular]')
        },
        
        
        visitRegExp : function (value, depth) {
            this.write(value + '')
        },
        
        
        visitDate : function (value, depth) {
            this.write('"' + value + '"')
        },
        

        // safer alternative to parent's implementation of `visitObject` - some host objects has no "hasOwnProperty" method
        visitObject : function (object, depth) {
            for (var key in object) {
                if (key != '__REFADR__' && (!object.hasOwnProperty || object.hasOwnProperty(key))) {
                    var value   = object[ key ]
                    
                    this.visitObjectKey(key, value, object, depth)
                    this.visitObjectValue(value, key, object, depth)
                }
            }

            var me  = this
            
            if (this.manualEnum) 
                Joose.A.each([ 'hasOwnProperty', 'valueOf', 'toString', 'constructor' ], function (key) {
                    if (object.hasOwnProperty && object.hasOwnProperty(key)) {
                        var value   = object[ key ]
                        
                        me.visitObjectKey(key, value, object, depth)
                        me.visitObjectValue(value, key, object, depth)
                    }
                })
            
            return object
        },
        
        
        visitDOMElement : function (object, depth) {
            var output  = '&lt;' + object.tagName
            
            if (object.id) output += ' id="' + object.id + '"'
            if (object.className) output += ' class="' + object.className + '"'
            
            this.write(output + '&gt;')
        },
        
        
        visitDOMStringMap : function () {
            this.write('[DOMStringMap]')
        },
        
        
        // the Object.prototype.toString.call(window) for FF
        visitWindow : function () {
            this.write('[window]')
        },
        
        
        // window.location type in FF
        visitLocation : function () {
            this.write('[window.location]')
        }
    },
    
    
    before : {
        visitObject : function () {
            this.write('{')
        },
        
        
        visitArray : function () {
            this.write('[')
        }
    },
    
    
    after : {
        visitObject : function () {
            var result = this.result
            
            if (result[ result.length - 1 ] == ', ') result.pop()
            
            this.write('}')
        },
        
        
        visitArray : function () {
            var result = this.result
            
            if (result[ result.length - 1 ] == ', ') result.pop()
            
            this.write(']')
        },
        
        
        visitObjectValue : function () {
            this.write(', ')
        },
        
        
        visitArrayEntry : function () {
            this.write(', ')
        }
    },
    
    
    my : {
        
        has : {
            HOST        : null
        },
        
        
        methods : {
            
            stringify : function (value, maxDepth) {
                var visitor     = new this.HOST({
                    maxDepth        : maxDepth || 4
                })
                
                visitor.visit(value, 0)
                
                return visitor.result.join('')
            }
        }
    }
})
;
Class('Siesta.Util.Queue', {
    
    has     : {
        // array of Objects, each containing arbitrary data about queue step. Possibly keys:
        // `processor` - an individual processor function for this step
        // can also be provided for whole queue
        // will receive the: (stepData, index, queue)
        // `isAsync` - when provided, the `next` function will be also embedded,
        // which should be called manually
        // `interval` - the delay after step (except for asynchronous)
        steps                   : Joose.I.Array,

        interval                : 100,
        callbackDelay           : 0,
        // setTimeout
        deferer                 : { required : true },
        // clearTimeout - only required when "abort" is planned / possible
        deferClearer            : null,
        
        processor               : null,
        processorScope          : null,
        
        currentTimeout          : null,
        callback                : null,
        scope                   : null,
        isAborted               : false,
        
        observeTest             : null,

        currentDelayStepId      : null
    },
    
    
    methods : {
        
        // step is an object with
        // { 
        //      processor : func, 
        //      processorScope : obj,
        //      next : func (in case of async step, will be populated by queue)
        // }
        
        addStep : function (stepData) {
            this.addSyncStep(stepData)
        },
        
        
        addSyncStep : function (stepData) {
            this.steps.push(stepData)
        },
        
        
        addAsyncStep : function (stepData) {
            stepData.isAsync = true
            
            this.steps.push(stepData)
        },

        addDelayStep : function (delayMs) {
            var origSetTimeout = this.deferer;
            var me = this;

            this.addAsyncStep({
                processor : function(data) {
                    me.currentDelayStepId = origSetTimeout(data.next, delayMs || 500);
                }
            });
        },
        
        
        run : function (callback, scope) {
            this.callback   = callback
            this.scope      = scope
            
            // abort the queue, if the provided test instance has finalized (probably because of exception)
            this.observeTest && this.observeTest.on('testfinalize', function () { this.abort(true) }, this, { single : true })
            
            this.doSteps(this.steps.slice(), callback, scope)
        },
        
        
        abort : function (ignoreCallback) {
            this.isAborted      = true
            
            var deferClearer    = this.deferClearer
            
            if (!deferClearer) throw "Need `deferClearer` to be able to `abort` the queue"

            deferClearer(this.currentDelayStepId);
            deferClearer(this.currentTimeout)
            
            if (!ignoreCallback) this.callback.call(this.scope || this)
        },
        
        
        doSteps : function (steps, callback, scope) {
            this.currentTimeout = null
            
            var me          = this
            var deferer     = this.deferer
            var step        = steps.shift()
            
            if (step) {
                var processor       = step.processor || this.processor
                var processorScope  = step.processorScope || this.processorScope
                
                var index           = this.steps.length - steps.length - 1
                
                if (!processor) throw new Error("No process function found for step: " + index)
                
                if (step.isAsync) {
                    var next = step.next = function () {
                        me.doSteps(steps, callback, scope)
                    }
                    
                    // processor should call `next` to continue
                    processor.call(processorScope || me, step, index, this, next)
                } else {
                    
                    processor.call(processorScope || me, step, index, this)
                    
                    if (this.isAborted) return
                    
                    var interval = step.interval || me.interval
                    
                    if (interval) 
                        this.currentTimeout = deferer(function () {
                            me.doSteps(steps, callback, scope)    
                        }, interval)
                    else
                        me.doSteps(steps, callback, scope)
                }
                
                
            } else {
                if (callback)
                    if (this.callbackDelay)
                        deferer(function () {
                            callback.call(scope || this)
                        }, this.callbackDelay)
                    else
                        callback.call(scope || this)
            }
        }
    }
})
;
Class('Siesta.Util.XMLNode', {
    
    has     : {
        children        : Joose.I.Array,
        
        tag             : { required : true },
        attributes      : Joose.I.Object,
        
        textContent     : null,
        
        escapeTable     : {
            
            init    : {
                '&'     : '&amp;', 
                '<'     : '&lt;', 
                '>'     : '&gt;', 
                '"'     : '&quot;'
            }
        }
        
    },
    
    
    methods : {
        
        escapeXml : function (s) {
            var me = this
            
            return typeof s != 'string' ? s : s.replace(/[&<>"]/g, function (match) {
                return me.escapeTable[ match ]
            })
        },
        
        
        toString : function () {
            var me                  = this
            var childrenContent     = []
            
            Joose.A.each(this.children, function (child) {
                childrenContent.push(child.toString())
            })
            
            var attributesContent       = []
            
            Joose.O.each(this.attributes, function (value, name) {
                attributesContent.push(name + '="' + me.escapeXml(value) + '"')
            })
            
            // to have predictable order of attributes in tests
            attributesContent.sort()
            
            attributesContent.unshift(this.tag)
            
            
            return '<' + attributesContent.join(' ') + '>' + (this.textContent != null ? this.escapeXml(this.textContent) : '') + childrenContent.join('') + '</' + this.tag + '>' 
        },
        
        
        appendChild : function (child) {
            if (child instanceof Siesta.Util.XMLNode)
                child.parent    = this
            else
                child           = new Siesta.Util.XMLNode(Joose.O.extend(child, { parent : this }))
                
            this.children.push(child)
            
            return child
        },
        
        
        setAttribute : function (name, value) {
            this.attributes[ name ] = value
        }
    }
})
;
Class('Siesta.Content.Resource', {
    
    has : {
        url             : null,
        
        content         : null
    },
    
    
    methods : {
        
        asHTML : function () {
            throw "Abstract method called"
        },
        
        
        asDescriptor : function () {
            throw "Abstract method called"
        },
        
        
        // todo should check same-origin 
        canCache : function () {
        }
        
    }
        
})
//eof Siesta.Result

;
Class('Siesta.Content.Resource.CSS', {
    
    isa     : Siesta.Content.Resource,
    
    has     : {
    },
    
    
    methods : {
        
        asHTML : function () {
        },
        
        
        asDescriptor : function () {
            var res = {
                type        : 'css'
            }
            
            if (this.url)       res.url         = this.url
            if (this.content)   res.contnet     = this.content
            
            return res
        }
    }
        
})
//eof Siesta.Result

;
Class('Siesta.Content.Resource.JavaScript', {
    
    isa     : Siesta.Content.Resource,
    
    has     : {
    },
    
    
    methods : {
        
        asHTML : function () {
        },
        
        
        asDescriptor : function () {
            var res = {
                type        : 'js'
            }
            
            if (this.url)       res.url         = this.url
            if (this.content)   res.content     = this.content
            
            return res
        }
    }
        
})
//eof Siesta.Result

;
Class('Siesta.Content.Preset', {
    
    has : {
        preload                 : Joose.I.Array,
        
        resources               : Joose.I.Array
    },
    
    
    methods : {
        
        initialize : function () {
            var me              = this
            
            Joose.A.each(this.preload, function (preloadDesc) {
                
                me.addResource(preloadDesc)
            })
        },
        
        
        isCSS : function (url) {
            return /\.css(\?.*)?$/i.test(url)
        },
        
        
        getResourceFromDescriptor : function (desc) {
            if (typeof desc == 'string')
            
                if (this.isCSS(desc))
                    return new Siesta.Content.Resource.CSS({
                        url         : desc
                    })
                else
                    return new Siesta.Content.Resource.JavaScript({
                        url         : desc
                    })
                    
            else if (desc.text) 
                return new Siesta.Content.Resource.JavaScript({
                    content         : desc.text
                })
                    
            else if (desc.type == 'css') 
                return new Siesta.Content.Resource.CSS({
                    content         : desc.content
                })
                
            else if (desc.type == 'js') 
                return new Siesta.Content.Resource.JavaScript({
                    content         : desc.content
                })
                
            else 
                throw "Incorrect preload descriptor:" + desc 
        },
        
        
        addResource : function (desc) {
            var resource    = (desc instanceof Siesta.Content.Resource) && desc || this.getResourceFromDescriptor(desc)
            
            this.resources.push(resource)
            
            return resource
        },
        
        
        eachResource : function (func, scope) {
            return Joose.A.each(this.resources, func, scope || this)
        },
        
        
        // deprecated - seems preset don't need to know about scope providers
        prepareScope : function (scopeProvider, contentManager) {
            
            this.eachResource(function (resource) {
                
                if (contentManager.hasContentOf(resource))
                    scopeProvider.addPreload({
                        type        : (resource instanceof Siesta.Content.Resource.CSS) ? 'css' : 'js', 
                        content     : contentManager.getContentOf(resource)
                    })
                else 
                    scopeProvider.addPreload(resource.asDescriptor())
            })
        }
    }
        
})

;
Class('Siesta.Content.Manager', {
    
    has : {
        disabled        : false,
        
        presets         : {
            require     : true
        },
        
        urls            : Joose.I.Object,
        
        maxLoads        : 5
    },
    
    
    methods : {
        
        cache : function (callback, errback, ignoreErrors) {
            if (this.disabled) {
                callback && callback()
                
                return
            }
            
            var urls    = this.urls
            var me      = this
            
            Joose.A.each(this.presets, function (preset) {
                
                preset.eachResource(function (resource) {
                    
                    if (resource.url) urls[ resource.url ] = null
                })
            })
            
            var loadCount   = 0
            var errorCount  = 0
            
            var total       = 0
            var urlsArray   = []
            Joose.O.each(urls, function (value, url) { total++; urlsArray.push(url) })
            
            if (total) {
                
                var loadSingle = function (url) {
                    if (!url) return
                    
                    me.load(url, function (content) {
                        if (errorCount) return
                        
                        urls[ url ] = content
                        
                        if (++loadCount == total) 
                            callback && callback()
                        else
                            loadSingle(urlsArray.shift())
                    
                    }, ignoreErrors ? function () {
                        
                        if (++loadCount == total) 
                            callback && callback()
                        else
                            loadSingle(urlsArray.shift())
                        
                    } : function () {
                        errorCount++
                        
                        errback && errback(url)
                    })
                }
                
                // running only `maxLoads` "loading threads" at the same time
                for (var i = 0; i < this.maxLoads; i++) loadSingle(urlsArray.shift())
                
            } else
                callback && callback()
        },
        
        
        load : function (url, callback, errback) {
            throw "abstract method `load` called"
        },
        
        
        hasContentOf : function (url) {
            if (url instanceof Siesta.Content.Resource) url = url.url
            
            return typeof this.urls[ url ] == 'string'
        },
        
        
        getContentOf : function (url) {
            if (url instanceof Siesta.Content.Resource) url = url.url
            
            return this.urls[ url ]
        }
    }
})

;
;
Class('Siesta.Result', {
    
    has : {
        description : null
    }
        
})
//eof Siesta.Result

;
Class('Siesta.Result.Diagnostic', {
    
    isa : Siesta.Result,
    
    has : {
        isWarning       : false,
        
        isSimulatedEvent : false,

        // Used by simulated events
        sourceX      : null,
        sourceY      : null,
        type         : null
    },

    methods : {
        
        toString : function () {
            return '# ' + this.description
        }
    }    
});

;
Class('Siesta.Result.Assertion', {
    
    isa : Siesta.Result,
    

    has : {
        name        : null,
        
        passed      : null,
        
        annotation  : null,
        
        index       : null,
        sourceLine  : null,
        
        isSkipped   : false,
        isTodo      : false,
        isWaitFor   : false,
        
        completed   : false     // for waitFor assertions
    },
    
    
    methods : {
        
        toString : function () {
            var text = (this.isTodo ? 'TODO: ' : '') + (this.passed ? 'ok ' : 'fail ') + this.index + ' - ' + this.description
            
            if (this.annotation) text += '\n' + this.annotation
            
            return text
        }
    }
})

;
/**
@class Siesta.Test.Function

This is a mixin, with helper methods for testing functionality relating to DOM elements. This mixin is consumed by {@link Siesta.Test}

*/
Role('Siesta.Test.Function', {
    
    methods : {
         /**
         * This assertion passes if the function is called at least one time during the test life span.
         * 
         * @param {Function/String} fn The function itself or the name of the function on the host object (2nd argument)
         * @param {Object} host The "owner" of the method
         * @param {String} desc The description of the assertion.
         */
        isCalled : function(fn, obj, desc) {
            this.isCalledNTimes(fn, obj, 1, desc, true);
        },

        /**
         * This assertion passes if the function is called exactly (n) times during the test life span.
         * 
         * @param {Function/String} fn The function itself or the name of the function on the host object (2nd argument)
         * @param {Object} host The "owner" of the method
         * @param {Number} n The expected number of calls
         * @param {String} desc The description of the assertion.
         */
        isCalledNTimes : function(fn, obj, n, desc, isGreaterEqual) {
            var me      = this,
                prop    = typeof fn === "string" ? fn : me.getPropertyName(obj, fn);
            desc = desc ? (desc + ' ') : '';

            this.on('beforetestfinalizeearly', function () {
                if (counter === n || (isGreaterEqual && counter > n)) {
                    me.pass(desc || (prop + ' method was called exactly ' + n + ' times'));
                } else {
                    me.fail(desc || prop, {
                        assertionName       : 'isCalledNTimes ' + prop, 
                        got                 : counter, 
                        need                : n ,
                        needDesc            : ("Need " + (isGreaterEqual ? 'at least ' : 'exactly '))
                    });
                }
            });

            var counter = 0;
            fn = obj[prop];
            obj[prop] = function () { counter++; fn.apply(obj, arguments); };
        },

        /**
         * This assertion passes if the function is not called during the test life span.
         * 
         * @param {Function/String} fn The function itself or the name of the function on the host object (2nd argument)
         * @param {Object} host The "owner" of the method
         * @param {Number} n The expected number of calls
         * @param {String} desc The description of the assertion.
         */
        isntCalled : function(fn, obj, desc) {
            this.isCalledNTimes(fn, obj, 0, desc);
        },

        getPropertyName : function(host, obj) {
            for (var o in host) {
                if (host[o] === obj) return o;
            }
        },

        /**
         * This assertion passes when the supplied function is called exactly (n) times during the test life span.
         * The `className` parameter can be supplied as a class constructor function or as a string, representing the class
         * name. In the latter case the `class` will be eval'ed to get a reference to the class constructor.
         *
         * This assertion is useful when testing for example an Ext JS class where event listeners are added during
         * class instantiation time, which means you need to observe the prototype method before instantiation.
         *
         * @param {Function/String} fn The function itself or the name of the function on the class (2nd argument)
         * @param {Function/String} className The constructor function or the name of the class that contains the method
         * @param {Number} n The expected number of calls
         * @param {String} desc The description of the assertion
         */
        methodIsCalledNTimes: function(fn, className, n, desc, isGreaterEqual){
            var me = this,
                prop,
                obj,
                counter = 0;

            desc = desc ? (desc + ' ') : '';
            try {
                if (me.typeOf(className) == 'String') className = me.global.eval(className)
            } catch (e) {
                me.fail(desc, {
                    assertionName       : 'isMethodCalled',
                    annotation          : "Exception [" + e + "] caught, while evaluating the class name [" + className + "]"
                })

                return
            }

            obj = className.prototype;
            prop = typeof fn === "string" ? fn : me.getPropertyName(obj, fn);

            me.on('beforetestfinalizeearly', function () {
                if (counter === n || (isGreaterEqual && counter > n)) {
                    me.pass(desc || (prop + ' method was called exactly ' + n + ' times'));
                } else {
                    me.fail(desc || prop, {
                        assertionName       : 'isCalledNTimes ' + prop,
                        got                 : counter,
                        need                : n ,
                        needDesc            : ("Need " + (isGreaterEqual ? 'at least ' : 'exactly '))
                    });
                }
            });

            fn = obj[prop];
            obj[prop] = function () { counter++; fn.apply(obj, arguments); };
        },

        /**
         * This assertion passes if the class method is called at least one time during the test life span.
         *
         * @param {Function/String} fn The function itself or the name of the function on the class (2nd argument)
         * @param {Function/String} className The class constructor function or name of the class that contains the method
         * @param {String} desc The description of the assertion.
         */
        methodIsCalled : function(fn, className, desc) {
            this.methodIsCalledNTimes(fn, className, 1, desc, true);
        },

        /**
         * This assertion passes if the class method is not called during the test life span.
         *
         * @param {Function/String} fn The function itself or the name of the function on the class (2nd argument)
         * @param {Function/String} className The class constructor function or name of the class that contains the method
         * @param {String} desc The description of the assertion.
         */
        methodIsntCalled : function(fn, className, desc) {
            this.methodIsCalledNTimes(fn, className, 0, desc);
        }
    }
});
;
/**
@class Siesta.Test.Date

A mixin with the additinal assertions for dates. Being consumed by {@link Siesta.Test}

*/
Role('Siesta.Test.Date', {
    
    methods : {
        
        isDateEq: function (got, expectedDate, description) {
            this.isDateEqual.apply(this, arguments);
        },

        
        /**
         * This assertion passes when the 2 provided dates are equal and fails otherwise.
         * 
         * It has a synonym: `isDateEq`
         * 
         * @param {Date} got The 1st date to compare
         * @param {Date} expectedDate The 2nd date to compare
         * @param {String} description The description of the assertion
         */
        isDateEqual: function (got, expectedDate, description) {
            if (got - expectedDate === 0) {
                this.pass(description);
            } else {
                this.fail(description, {
                    assertionName   : 'isDateEqual',
                    
                    got         : got ? got.toString() : '',
                    gotDesc     : 'Got',
                    
                    need        : expectedDate.toString()
                });
            }
        }
    }
});
;
/**
@class Siesta.Test.More

A mixin with additional generic assertion methods, which can work cross-platform between browsers and NodeJS. 
Is being consumed by {@link Siesta.Test}, so all of them are available in all tests. 

*/
Role('Siesta.Test.More', {
    
    requires        : [ 'isFailed', 'typeOf', 'on' ],
    
    
    has : {
        autoCheckGlobals        : false,
        expectedGlobals         : Joose.I.Array,

        disableGlobalsCheck     : false,
        
        browserGlobals : { 
            init : [
                'console',
                'getInterface',
                'ExtBox1',
                '__IE_DEVTOOLBAR_CONSOLE_COMMAND_LINE',
                'seleniumAlert',
                'onload',
                'onerror', 
                'StartTest',
                'startTest',
                // will be reported in IE8 after overriding
                'setTimeout',
                'clearTimeout',
                'requestAnimationFrame',
                'cancelAnimationFrame'
            ]
        },
        
        /**
         * @cfg {Number} waitForTimeout Default timeout for `waitFor` (in milliseconds). Default value is 10000. 
         */
        waitForTimeout          : 10000,
        
        waitForPollInterval     : 100
    },
    
    
    methods : {
        
        /**
         * This assertion passes, when the comparison of 1st with 2nd, using `>` operator will return `true` and fails otherwise. 
         * 
         * @param {Number/Date} value1 The 1st value to compare
         * @param {Number/Date} value2 The 2nd value to compare
         * @param {String} desc The description of the assertion
         */
        isGreater : function (value1, value2, desc) {
            if (value1 > value2)
                this.pass(desc)
            else
                this.fail(desc, {
                    assertionName   : 'isGreater',
                    
                    got         : value1,
                    need        : value2,
                    
                    needDesc    : "Need, greater than"
                })
        },
        
        
        /**
         * This assertion passes, when the comparison of 1st with 2nd, using `<` operator will return `true` and fails otherwise. 
         * 
         * @param {Number/Date} value1 The 1st value to compare
         * @param {Number/Date} value2 The 2nd value to compare
         * @param {String} desc The description of the assertion
         */
        isLess : function (value1, value2, desc) {
            if (value1 < value2)
                this.pass(desc)
            else
                this.fail(desc, {
                    assertionName   : 'isLess',
                    
                    got         : value1,
                    need        : value2,
                    
                    needDesc    : "Need, less than"
                })
        },
        

        isGE : function () {
            this.isGreaterOrEqual.apply(this, arguments)
        },
        
        /**
         * This assertion passes, when the comparison of 1st with 2nd, using `>=` operator will return `true` and fails otherwise. 
         * 
         * It has a synonym - `isGE`.
         * 
         * @param {Number/Date} value1 The 1st value to compare
         * @param {Number/Date} value2 The 2nd value to compare
         * @param {String} desc The description of the assertion
         */
        isGreaterOrEqual : function (value1, value2, desc) {
            if (value1 >= value2)
                this.pass(desc)
            else
                this.fail(desc, {
                    assertionName   : 'isGreaterOrEqual',
                    
                    got         : value1,
                    need        : value2,
                    
                    needDesc    : "Need, greater or equal to"
                })
        },
        

        
        isLE : function () {
            this.isLessOrEqual.apply(this, arguments)
        },
        
        /**
         * This assertion passes, when the comparison of 1st with 2nd, using `<=` operator will return `true` and fails otherwise. 
         * 
         * It has a synonym - `isLE`.
         * 
         * @param {Number/Date} value1 The 1st value to compare
         * @param {Number/Date} value2 The 2nd value to compare
         * @param {String} desc The description of the assertion
         */
        isLessOrEqual : function (value1, value2, desc) {
            if (value1 <= value2)
                this.pass(desc)
            else
                this.fail(desc, {
                    assertionName   : 'isLessOrEqual',
                    
                    got         : value1,
                    need        : value2,
                    
                    needDesc    : "Need, less or equal to"
                })
        },
        
        
        /**
         * This assertion suppose to compare the numeric values. It passes when the passed values are approximately the same (the difference 
         * is withing a threshold). A threshold can be provided explicitly (when assertion is called with 4 arguments), 
         * or it will be set to 5% from the 1st value (when calling assertion with 3 arguments).
         * 
         * @param {Number} value1 The 1st value to compare
         * @param {Number} value2 The 2nd value to compare
         * @param {Number} threshHold The maximum allowed difference between values. This argument can be omited. 
         * @param {String} desc The description of the assertion
         */
        isApprox : function (value1, value2, threshHold, desc) {
            if (arguments.length == 3) {
                desc        = threshHold
                threshHold  = Math.abs(value1 * 0.05)
            }
            
            if (Math.abs(value2 - value1) <= threshHold)
                this.pass(desc, value2 == value1 ? 'Exact match' : 'Match within treshhold: ' + threshHold)
            else
                this.fail(desc, {
                    assertionName       : 'isApprox', 
                    got                 : value1, 
                    need                : value2, 
                    needDesc            : 'Need approx',
                    annotation          : 'Threshold is: ' + threshHold
                })
        },
        
        
        /**
         * This assertion passes when the passed `string` matches to a regular expression `regex`. When `regex` is a string, 
         * assertion will check that it is a substring of `string`
         * 
         * @param {String} string The string to check for "likeness"
         * @param {String/RegExp} regex The regex against which to test the string, can be also a plain string
         * @param {String} desc The description of the assertion
         */
        like : function (string, regex, desc) {
            if (this.typeOf(regex) == "RegExp")
            
                if (string.match(regex))
                    this.pass(desc)
                else
                    this.fail(desc, {
                        assertionName       : 'like', 
                        got                 : string, 
                        need                : regex, 
                        needDesc            : 'Need string matching'
                    })
            else
             
                if (string.indexOf(regex) != -1)
                    this.pass(desc)
                else
                    this.fail(desc, {
                        assertionName       : 'like', 
                        got                 : string, 
                        need                : regex, 
                        needDesc            : 'Need string containing'
                    })
        },
        
        /**
         * This method is the opposite of 'like', it adds failed assertion, when the string matches the passed regex.
         * 
         * @param {String} string The string to check for "unlikeness"
         * @param {String/RegExp} regex The regex against which to test the string, can be also a plain string
         * @param {String} desc The description of the assertion
         */
        unlike : function(string, regex, desc) {
            if (this.typeOf(regex) == "RegExp")
            
                if (!string.match(regex))
                    this.pass(desc)
                else
                    this.fail(desc, {
                        assertionName       : 'unlike', 
                        got                 : string, 
                        need                : regex, 
                        needDesc            : 'Need string not matching'
                    })
            else
             
                if (string.indexOf(regex) == -1)
                    this.pass(desc)
                else
                    this.fail(desc, {
                        assertionName       : 'unlike', 
                        got                 : string, 
                        need                : regex, 
                        needDesc            : 'Need string not containing'
                    })
        },
        
        
        "throws" : function () {
            this.throwsOk.apply(this, arguments)
        },
        
        throws_ok : function () {
            this.throwsOk.apply(this, arguments)
        },
        
        /**
         * This assertion passes, when the `func` function throws the exception during executing, and the
         * stringified exception passes the 'like' assertion (with 'expected' parameter).
         * 
         * It has synonyms - `throws_ok` and `throws`.
         * 
         * @param {Function} func The function which supposed to throw an exception
         * @param {String/RegExp} expected The regex against which to test the stringified exception, can be also a plain string
         * @param {String} desc The description of the assertion
         */
        throwsOk : function (func, expected, desc) {
            if (this.typeOf(func) != 'Function') throw new Error('throws_ok accepts a function as 1st argument')
            
            desc = desc || 'throwsOk';
            
            var e = this.getExceptionCatcher()(func)
            
            // assuming no one will throw undefined exception..
            if (e === undefined) {
                this.fail(desc, {
                    assertionName       : 'throws_ok', 
                    annotation          : 'Function did not throw an exception'
                })
                
                return
            }
            
            if (e instanceof this.getTestErrorClass())
                //IE uses non-standard 'description' property for error msg
                e = e.message || e.description
                
            e = '' + e
                
            if (this.typeOf(expected) == "RegExp")
            
                if (e.match(expected))
                    this.pass(desc)
                else
                    this.fail(desc, {
                        assertionName       : 'throws_ok', 
                        got                 : e, 
                        gotDesc             : 'Exception stringifies to',
                        need                : expected, 
                        needDesc            : 'Need string matching'
                    })
            else
             
                if (e.indexOf(expected) != -1)
                    this.pass(desc)
                else
                    this.fail(desc, {
                        assertionName       : 'throws_ok', 
                        got                 : e, 
                        gotDesc             : 'Exception stringifies to',
                        need                : expected, 
                        needDesc            : 'Need string containing'
                    })
        },
        
        
        
        lives_ok : function () {
            this.livesOk.apply(this, arguments)
        },
        
        lives : function () {
            this.livesOk.apply(this, arguments)
        },
        
        /**
         * This assertion passes, when the supplied `func` function doesn't throw an exception during execution.
         * 
         * This method has two synonyms: `lives_ok` and `lives`
         * 
         * @param {Function} func The function which is not supposed to throw an exception
         * @param {String} desc The description of the assertion
         */
        livesOk : function (func, desc) {
            if (this.typeOf(func) != 'Function') {
                func = [ desc, desc = func][ 0 ]
            }
            
            var e = this.getExceptionCatcher()(func)
            
            if (e === undefined) 
                this.pass(desc)
            else
                this.fail(desc, {
                    assertionName       : 'lives_ok', 
                    annotation          : 'Function threw an exception: ' + e
                })
        },
        
        
        isa_ok : function (value, className, desc) {
            this.isaOk(value, className, desc)
        },
        
        /**
         * This assertion passes, when the supplied `value` is the instance of the `className`. The check is performed with
         * `instanceof` operator. The `className` parameter can be supplied as class constructor or as string, representing the class
         * name. In the latter case the `class` will eval'ed to receive the class constructor.
         * 
         * This method has a synonym: isa_ok
         * 
         * @param {Mixed} value The value to check for 'isa' relationship
         * @param {Class/String} className The class to check for 'isa' relationship with `value`
         * @param {String} desc The description of the assertion
         */
        isaOk : function (value, className, desc) {
            try {
                if (this.typeOf(className) == 'String') className = this.global.eval(className)
            } catch (e) {
                this.fail(desc, {
                    assertionName       : 'isa_ok', 
                    annotation          : "Exception [" + e + "] caught, while evaluating the class name [" + className + "]"
                })
                
                return
            }
            
            if (value instanceof className) 
                this.pass(desc)
            else
                this.fail(desc, {
                    assertionName       : 'isa_ok', 
                    got                 : value, 
                    need                : String(className), 
                    needDesc            : 'Need, instance of'
                })
        },
        
        
//        isString : function () {
//        },
        
//        isObject : function () {
//        },
        
//        isArray : function () {
//        },

//        isNumber : function () {
//        },

//        isBoolean : function () {
//        },

//        isDate : function () {
//        },

//        isRegExp : function () {
//        },
        
        
        countKeys : function (object) {
            var counter = 0
            
            Joose.O.eachOwn(object, function () {
                counter++
            })
            
            return counter
        },
        
        
        /**
         * This method performs a deep comparison of the passed JSON objects. Objects must not contain cyclic references.
         * You can use this method in your own assertions.
         * 
         * @param {Object} obj1 The 1st object to compare
         * @param {Object} obj2 The 2nd object to compare
         * @param {Boolean} strict When passed the `true` value, the comparison of the primitive values will be performed with the 
         * `===` operator (so [ 1 ] and [ "1" ] object will be different).
         * @return {Boolean} `true` if the passed objects are equal
         */
        compareObjects : function (obj1, obj2, strict) {
            if (strict) {
                if (obj1 === obj2) return true
            } else 
                if (obj1 == obj2) return true
                
            
            var type1 = this.typeOf(obj1)
            var type2 = this.typeOf(obj2)
            
            if (type1 != type2) return false
            
            if (type1 == 'Array')
                if (obj1.length != obj2.length) 
                    return false
                else {
                    for (var i = 0; i < obj1.length; i++)
                        if (!this.compareObjects(obj1[ i ], obj2[ i ], strict)) return false
                    
                    return true
                }
            
            var me = this
                
            if (type1 == 'Object')
                if (this.countKeys(obj1) != this.countKeys(obj2)) 
                    return false
                else {
                    var res = Joose.O.eachOwn(obj1, function (value, name) {
                        
                        if (!me.compareObjects(value, obj2[ name ], strict)) return false
                    })
                    
                    return res === false ? false : true
                }
                
            if (type1 == 'Date') return !Boolean(obj1 - obj2)
        }, 
        
        
        is_deeply : function (obj1, obj2, desc) {
            this.isDeeply.apply(this, arguments)
        },
        
        /**
         * This assertion passes when in-depth comparison of 1st and 2nd arguments (which are assumed to be JSON objects) shows that they are equal.
         * Comparison is performed with '==' operator, so `[ 1 ]` and `[ "1" ] objects will be equal. The objects should not contain cyclic references.
         * 
         * This method has a synonym: `is_deeply`
         * 
         * @param {Object} obj1 The 1st object to compare
         * @param {Object} obj2 The 2nd object to compare
         * @param {String} desc The description of the assertion
         */
        isDeeply : function (obj1, obj2, desc) {
            if (this.compareObjects(obj1, obj2))
                this.pass(desc)
            else
                this.fail(desc, {
                    assertionName       : 'isDeeply', 
                    got                 : obj1, 
                    need                : obj2 
                })
        },
        
        
        /**
         * This assertion passes when in-depth comparison of 1st and 2nd arguments (which are assumed to be JSON objects) shows that they are equal.
         * Comparison is performed with '===' operator, so `[ 1 ]` and `[ "1" ] objects will be different. The objects should not contain cyclic references.
         * 
         * @param {Object} obj1 The 1st object to compare
         * @param {Object} obj2 The 2nd object to compare
         * @param {String} desc The description of the assertion
         */
        isDeeplyStrict : function (obj1, obj2, desc) {
            if (this.compareObjects(obj1, obj2, true))
                this.pass(desc)
            else
                this.fail(desc, {
                    assertionName       : 'isDeeplyStrict', 
                    got                 : obj1, 
                    need                : obj2 
                })
        },
        
        expectGlobal : function () {
            this.expectGlobals.apply(this, arguments)
        },
        
        /**
         * This method accepts a variable number of names of expected properties in the global scope. When verifying the globals with {@link #verifyGlobals}
         * assertions, the expected gloabls will not be counted as failed assertions.
         * 
         * This method has a synonym with singular name: `expectGlobal`
         * 
         * @param {String/RegExp} name1 The name of global property or the regular expression to match several properties
         * @param {String/RegExp} name2 The name of global property or the regular expression to match several properties
         * @param {String/RegExp} nameN The name of global property or the regular expression to match several properties
         */
        expectGlobals : function () {
            this.expectedGlobals.push.apply(this.expectedGlobals, arguments)
        },
        
        /**
         * This method accepts a variable number of names of expected properties in the global scope and then performs a globals check. 
         *
         * It will scan all globals properties in the scope of test and compare them with the list of expected globals. Expected globals can be provided with:
         * {@link #expectGlobals} method or {@link Siesta.Harness#expectedGlobals expectedGlobals} configuration option of harness.
         * 
         * You can enable this assertion to automatically happen at the end of each test, using {@link Siesta.Harness#autoCheckGlobals autoCheckGlobals} option of the harness.
         * 
         * @param {String/RegExp} name1 The name of global property or the regular expression to match several properties
         * @param {String/RegExp} name2 The name of global property or the regular expression to match several properties
         * @param {String/RegExp} nameN The name of global property or the regular expression to match several properties
         */
        verifyGlobals : function () {
            if (this.disableGlobalsCheck) {
                this.diag('Testing leakage of global variables is not supported on this platform')
                
                return
            }
            
            this.expectGlobals.apply(this, arguments)
            
            var me                  = this
            var expectedStrings     = {}
            var expectedRegExps     = []
            
            Joose.A.each(this.expectedGlobals.concat(this.browserGlobals), function (value) {
                if (me.typeOf(value) == 'RegExp')
                    expectedRegExps.push(value)
                else
                    expectedStrings[ value ] = true 
            })
            
            this.diag('Global variables')
            
            var failed              = false
            
            for (var name in this.global) {
                if (expectedStrings[ name ]) continue
                
                var isExpected      = false
                
                for (var i = 0; i < expectedRegExps.length; i++) {
                    if (expectedRegExps[ i ].test(name)) {
                        isExpected = true
                        break
                    }
                }
                
                if (!isExpected) {
                    me.fail('Unexpected global found', 'Global name: ' + name + ', value: ' + Siesta.Util.Serializer.stringify(this.global[name]))
                    
                    failed      = true
                }
            }
            
            if (!failed) this.pass('No unexpected global variables found')
        },
        
        
        // will create a half-realized, "phantom", "isWaitFor" assertion, which is only purposed
        // for user to get the instant feedback about "waitFor" actions
        // this assertion will be "finalized" and added to the test results in the "finalizeWaiting"
        startWaiting : function (description) {
            var result = new Siesta.Result.Assertion({
                description : description,
                isWaitFor   : true,
                index       : ++this.assertCount
            });
            
            this.harness.onTestUpdate(this, result)
            this.fireEvent('testupdate', this, result)
            
            return result;
        },
        
        
        finalizeWaiting : function (result, passed, desc, annotation, errback) {
            // Treat this is an ordinary assertion from now on
            result.completed = true;
            
            if (passed)
                this.pass(desc, annotation, result)
            else {
                this.fail(desc, annotation, result);
                
                errback && errback()
            }
        },
        
        
        /**
         * Waits for passed checker method to return true (or any non-false value, like for example DOM element or array), and calls the callback when this happens.
         * As an additional feature, the callback will receive the result from the checker method as the 1st argument.  
         *
         * You can also call this method with a single Object having the following properties: method, callback, scope, timeout.
         * 
         * @param {Object/Function/Number} method Either a function which should return true when a certain condition has been fulfilled, or a number of ms to wait before calling the callback. 
         * @param {Function} callback A function to call when the condition has been met. Will receive a result from checker function.
         * @param {Object} scope The scope for the callback
         * @param {Int} timeout The maximum amount of time (in milliseconds) to wait for the condition to be fulfilled. Defaults to the {@link Siesta.Test.ExtJS#waitForTimeout} value. 
         * @param {Int} interval The polling interval (in milliseconds)
         */
        waitFor : function (method, callback, scope, timeout, interval)  {
            var description         = this.typeOf(method) == 'Number' ? (method + ' ms') : ' condition to be fullfilled';
            var assertionName       = 'waitFor';
            var errback

            if (arguments.length === 1) {
                var options     = method;
                
                method          = options.method;
                callback        = options.callback;
                scope           = options.scope;
                timeout         = options.timeout;
                interval        = options.interval
                
                description     = options.description || description;
                assertionName   = options.assertionName || assertionName;
                
                // errback is called in case "waitFor" has failed (used in Apple integration for example)
                errback         = options.errback
            }

            var me                      = this;
            
            var sourceLine              = me.getSourceLine();
            var originalSetTimeout      = me.originalSetTimeout;
            var originalClearTimeout    = me.originalClearTimeout;
            var pollTimeout
            
            // early notification about the started "waitFor" operation
            var waitAssertion           = me.startWaiting('Waiting for ' + description);
            
            interval        = interval || this.waitForPollInterval
            timeout         = timeout || this.waitForTimeout
            
            // this async frame not supposed to fail, because its delayed to `timeout + 3 * interval`
            // failure supposed to be generated in the "pollFunc" and this async frame to be closed
            // however, in IE it happens that async frame may end earlier than failure from "pollFunc"
            // in such case we report same error as in "pollFunc"
            var async       = this.beginAsync(timeout + 3 * interval, function () {
                originalClearTimeout(pollTimeout)
                
                me.finalizeWaiting(waitAssertion, false, 'Waited too long for: ' + description, {
                    assertionName       : assertionName,
                    sourceLine          : sourceLine,
                    annotation          : 'Condition was not fullfilled during ' + timeout + 'ms'
                }, errback)
                
                return true
            })

            // stop polling, if this test instance has finalized (probably because of exception)
            this.on('testfinalize', function () {
                originalClearTimeout(pollTimeout)
            }, null, { single : true })

            if (this.typeOf(method) == 'Number') {
                pollTimeout = originalSetTimeout(function() {
                    me.finalizeWaiting(waitAssertion, true, 'Waited ' + method + ' ms');
                    me.endAsync(async); 
                    me.processCallbackFromTest(callback, [], scope || me)
                }, method);
                
            } else {
            
                var startDate   = new Date()
            
                var pollFunc    = function () {
                    var time = new Date() - startDate;
                    
                    if (time > timeout) {
                        me.endAsync(async);

                        me.finalizeWaiting(waitAssertion, false, 'Waited too long for: ' + description, {
                            assertionName       : assertionName,
                            sourceLine          : sourceLine,
                            annotation          : 'Condition was not fullfilled during ' + timeout + 'ms'
                        }, errback)
                    
                        return
                    }
                
                    try {
                        var result = method.call(scope || me);
                    } catch (e) {
                        me.endAsync(async);
                    
                        me.finalizeWaiting(waitAssertion, false, assertionName + ' checker threw an exception', {
                            assertionName       : assertionName,
                            got                 : e.toString(),
                            gotDesc             : "Exception"
                        }, errback)
                    
                        return
                    }
                
                    if (result != null && result !== false) {
                        me.endAsync(async);
                        
                        me.finalizeWaiting(waitAssertion, true, 'Waited ' + time + ' ms for ' + description);
                        
                        me.processCallbackFromTest(callback, [ result ], scope || me)
                    } else 
                        pollTimeout = originalSetTimeout(pollFunc, interval)
                }
            
                pollFunc()
            }
        },
        
        
        // takes the step function and tries to analyze if it is missing the call to "next"
        // returns "true" if "next" is used, 
        analyzeChainStep : function (func) {
            var sources         = func.toString()
            var firstArg        = sources.match(/function\s*[^(]*\(\s*(.*?)\s*(?:,|\))/)[ 1 ]
                        
            if (!firstArg) return false
            
            var body            = sources.match(/\{([\s\S]*)\}/)[ 1 ]
            
            return body.indexOf(firstArg) != -1
        },
        
        
        /**
         * This method accept either variable number of arguments (steps) or the array of them. Each step should be either a function or configuration object for test actions. 
         * These functions / actions will be executed in order.
         * 
         * If step is a function, as the 1st argument, it will receive a callback to call when the step is completed. As the 2nd and further arguments, the step function will receive the
         * arguments passed to the previous callback.
         * 
         * The last step will receive a no-op callback, which can be ignored or still called.  
         * 
         * If a step is presented with action configuration object, then the callback will be called by the action class automatically. Configuration object should contain the "action" property,
         * specifying the action class and some other config options (depending from the action class). 
         * 
         * Its better to see how it works on the example. For example, when using using only functions:
         
    t.chain(
        // function receives a callback as 1st argument
        function (next) {
            // we pass that callback to the "click" method
            t.click(buttonEl, next)
        },
        function (next) {
            t.type(fieldEl, 'Something', next)
        },
        function (next) {
            t.is(fieldEl.value == 'Something', 'Correct value in the field')
            
            // call the callback with some arguments
            next('foo', 'bar')  
        }, 
        // those arguments are now available as arguments of next step
        function (next, value1, value2) {
            t.is(value1, 'foo', 'The arguments for the callback are translated to the arguments of the step')
            t.is(value2, 'bar', 'The arguments for the callback are translated to the arguments of the step')
        }
    )

         * 
         * The same example, using action configuration objects for first 2 steps. For the list of available actions please refer to the classes in the Siesta.Test.Action namespace.
         
    t.chain(
        {
            action      : 'click',
            target      : buttonEl
        },
        {
            action      : 'type',
            target      : fieldEl,
            text        : 'Something'
        },
        function (next) {
            t.is(fieldEl.value == 'Something', 'Correct value in the field')
            
            next('foo', 'bar')  
        }, 
        ...
    )
    
         * Please note, that by default, each step is expected to complete within the {@link Siesta.Harness#defaultTimeout} time. 
         * You can change this with the `timeout` property of the step configuration object, allowing some steps to last longer.
         * 
         * In a special case, `action` property of the step configuration object can be a function. In this case you can also 
         * provide a `timeout` property, otherwise this case is identical to using functions:
         *  

    t.chain(
        {
            action      : function (next) { ... },
            // allow 50s for the function to call "next" before step will be considered timed-out
            timeout     : 50000
        },
        ...
    )
    
         *  
         *  @param {Function/Object/Array} step1 The function to execute or action configuration, or the array of such
         *  @param {Function/Object} step2 The function to execute or action configuration
         *  @param {Function/Object} stepN The function to execute or action configuration
         */
        chain : function () {
            var me          = this
            
            var queue       = new Siesta.Util.Queue({
                deferer         : this.originalSetTimeout,
                deferClearer    : this.originalClearTimeout,
                
                interval        : this.actionDelay,
                
                observeTest     : this
            })
            
            var sourceLine  = me.getSourceLine();
            
            // inline any arrays in the arguments into one array
            var steps       = Array.prototype.concat.apply([], arguments)
            
            var len         = steps.length
            var args        = []
            
            Joose.A.each(steps, function (step, index) {
                
                var isLast      = index == len - 1
                
                queue.addAsyncStep({
                    processor : function (data) {
                        var isWaitStep  = step.action == 'wait' || step.waitFor
                        
                        if (!isWaitStep) {
                            var timeout     = step.timeout || me.defaultTimeout
                            
                            // + 100 to allow `waitFor` steps (which will be waiting the `timeout` time) to
                            // generate their own failures
                            var async       = me.beginAsync(timeout + 100, function () {
                                me.fail(
                                    'The step in `t.chain()` call did not complete within required timeframe, chain can not proceed',
                                    {
                                        sourceLine      : sourceLine,
                                        annotation      : 'Step number: ' + (index + 1) + ' (1-based)' + (sourceLine ? '\nAt line    : ' + sourceLine : ''),
                                        ownTextOnly     : true
                                    }
                                )
                                
                                return true
                            })
                        }
                        
                        var nextFunc    = function () {
                            if (!isWaitStep) me.endAsync(async)
                            
                            args    =  Array.prototype.slice.call(arguments);
                            
                            if (step.desc) {
                                me.pass(step.desc);
                            }
                            data.next()
                        }
                        
                        if (me.typeOf(step) == 'Function' || me.typeOf(step.action) == 'Function') {
                            var func    = me.typeOf(step) == 'Function' ? step : step.action
                            
                            // if the last step is a function - then provide "null" as the "next" callback for it
                            args.unshift(isLast ? function () {} : nextFunc)
                            
                            if (!isLast && !me.analyzeChainStep(func)) me.fail('Step function [' + func.toString() + '] does not use provided "next" function anywhere')
                            
                            func.apply(me, args)
                            
                            // and finalize the async frame manually, as the "nextFunc" for last step will never be called
                            isLast && me.endAsync(async)
                            
                        } else if (me.typeOf(step) == 'String') {
                            var action      = new Siesta.Test.Action.Eval({
                                actionString        : step,
                                next                : nextFunc,
                                test                : me
                            })
                            
                            action.process()
                            
                        } else {
                            if (!step.args) step.args   = args
                            
                            // Don't pass target to next step if it is a waitFor action, it does not make sense and messes up the arguments
                            if (!isLast && (steps[ index + 1 ].waitFor || steps[ index + 1 ].action == 'wait')) {
                                step.passTargetToNext = false;
                            }

                            step.next       = nextFunc
                            step.test       = me
                            
                            var action      = Siesta.Test.ActionRegistry.create(step)
                            
                            action.process()
                        }
                    } 
                })
            })
            
            queue.run()
        }
    },
    
    
    after : {
        
        initialize        : function () {
            
            this.on('beforetestfinalize', function () {
                
                if (this.autoCheckGlobals && !this.isFailed()) this.verifyGlobals()
                
            }, this)
        }
    }
        
})
//eof Siesta.Test.More
;
/**
@class Siesta.Test.BDD

A mixin providing a BDD style layer for all the assertion methods.
It is consumed by {@link Siesta.Test}, so all of its methods are available in all tests. 

*/
Role('Siesta.Test.BDD', {
    
    methods : {
        
    }
        
})
//eof Siesta.Test.BDD
;
/**
@class Siesta.Test
@mixin Siesta.Test.More
@mixin Siesta.Test.Date 
@mixin Siesta.Test.Function 

`Siesta.Test` is a base testing class in Siesta hierarchy. Its not supposed to be created manually, instead, the harness will create it for you.

This file is a reference only, for a getting start guide and manual, please refer to <a href="#!/guide/siesta_getting_started">Getting Started Guide</a>.

Please note: Each test will be run in **its own**, completely **isolated** and **clean** global scope. **There is no need to cleanup anything**.

SYNOPSIS
========

    StartTest(function(t) {
        t.diag("Sanity")
        
        t.ok($, 'jQuery is here')
        
        t.ok(Your.Project, 'My project is here')
        t.ok(Your.Project.Util, '.. indeed')
        
        setTimeout(function () {
        
            t.ok(true, "True is ok")
        
        }, 500)
    })    


*/

Class('Siesta.Test', {
    
    does        : [ 
        Siesta.Test.More,
        Siesta.Test.Date,
        Siesta.Test.Function,
        Siesta.Test.BDD,
        JooseX.Observable
    ],
    
    
    has        : {
        url                 : { required : true },
        urlExtractRegex     : {
            is      : 'rwc',
            lazy    : function () {
                return new RegExp(this.url.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") + ':(\\d+)')
            }
        },
        
        assertPlanned       : null,
        assertCount         : 0,
        
        results             : Joose.I.Array,
        
        run                 : { required : true },
        startTestAnchor     : null,
        exceptionCatcher    : null,
        testErrorClass      : null,
        
        harness             : { required : true },
        
        /**
         * @cfg {Number} isReadyTimeout 
         * 
         * Timeout in milliseconds to wait for test start. Default value is 10000. See also {@link #isReady}  
         */
        isReadyTimeout      : 10000,

        // indicates that test has threw an exception (not related to failed assertions)
        failed              : false,
        failedException     : null,
        
        startDate           : null,
        endDate             : null,
        lastActivityDate    : null,
        contentManager      : null,
        
        // the scope provider for the context of the test page
        scopeProvider       : null,
        // the context of the test page
        global              : { required : true },
        
        // the scope provider for the context of the test script
        // usually the same as the `scopeProvider`, but may be different in case of using `separateContext` option
        scriptScopeProvider : null,
        
        transparentEx       : false,
        
        needDone            : false,
        isDone              : false,
        
        defaultTimeout      : 15000,
        
        timeoutsCount       : 1,
        timeoutIds          : Joose.I.Object,
        idsToIndex          : Joose.I.Object,
        waitTitles          : Joose.I.Object,
        
        
        // indicates that test function has completed the execution (test may be still running due to async)
        processed           : false,
        
        callback            : null,
        
        // Nbr of exceptions detected while running the test
        nbrExceptions       : 0,
        testEndReported     : false,
        
        // only used for testing itself, otherwise should be always `true`
        needToCleanup           : true,
        
        overrideSetTimeout      : true,
        
        originalSetTimeout      : { required : true },
        originalClearTimeout    : { required : true }
    },
    
    
    methods : {
        
        /**
         * This method allows you to delay the start of the test, for example for performing some asynchronous setup code (like login into application).  
         * 
         * It is supposed to be overriden in the subclass of Siesta.Test and should return object with properties "ready" and "reason" 
         * ("reason" is only meaningful for "ready : false"). Test instance will poll this method and will only launch
         * the test, when this method will return "ready : true". If waiting for this will take longer than {@link #isReadyTimeout} then, test
         * will be launched anyway, but a failing assertion will be added to it.
         * 
         * **Important** This method should always check the value returned by `this.SUPER` call. 
         * 
         * Typical example of using this method will be:
         * 

    Class('My.Test.Class', {
        
        isa         : Siesta.Test.Browser,
            
        has         : {
            isCustomSetupDone           : false
        },
        
        override : {
            
            isReady : function () {
                var result = this.SUPERARG(arguments);
    
                if (!result.ready) return result;
    
                if (!this.isCustomSetupDone) return {
                    ready       : false,
                    reason      : "Waiting for `isCustomSetupDone` took too long - something wrong?"
                }
                
                return {
                    ready       : true
                }
            },
    
            
            start : function () {
                var me      = this;
                
                Ext.Ajax.request({
                    url     : 'do_login.php',
                    
                    params  : { ... },
                    
                    success : function () {
                        me.isCustomSetupDone    = true
                    }
                })
                
                this.SUPERARG(arguments)
            }
        },
        
        ....
    })
    
         * 
         * @return {Object} Object with properties `{ ready : true/false, reason : 'description' }`
         */
        isReady: function() {
            // this should allow us to wait until the presense of "run" function
            // it will become available after call to StartTest method
            // which some users may call asynchronously, after some delay
            // see https://www.assembla.com/spaces/bryntum/tickets/379
            // in this case test can not be configured using object as 1st argument for StartTest
            this.run    = this.run || this.getStartTestAnchor().args && this.getStartTestAnchor().args[ 0 ]
            
            return {
                ready   : this.typeOf(this.run) == 'Function',
                reason  : 'No code provided to test'
            }
        },

        toString : function() {
            return this.url
        },
        
        
        // deprecated
        plan : function (value) {
            if (this.assertPlanned != null) throw new Error("Test plan can't be changed")
            
            this.assertPlanned = value
        },
        
        
        addResult : function (result) {
            // check for class name for cross-context instances (happens during self-testing)
            var isAssertion = (result instanceof Siesta.Result.Assertion) || result.meta.name == 'Siesta.Result.Assertion'
            
            // only allow to add diagnostic results and todo results after the end of test
            // and only if "needDone" is enabled
            if (isAssertion && (this.isDone || this.isFinished()) && !result.isTodo) {
                if (!this.testEndReported) {
                    this.testEndReported = true
                    
                    this.fail("Adding assertions after the test has finished.")
                }
            }

            if (isAssertion && !result.index) {
                result.index = ++this.assertCount
            }

            this.results.push(result)
            
            this.harness.onTestUpdate(this, result)
            
            /**
             * This event is fired when the individual test case receives new result (assertion or diagnostic message). 
             * 
             * This event bubbles up to the {@link Siesta.Harness harness}, you can observe it on harness as well. 
             * 
             * @event testupdate
             * @member Siesta.Test
             * @param {JooseX.Observable.Event} event The event instance
             * @param {Siesta.Test} test The test instance that just has started
             * @param {Siesta.Result} result The new result. Instance of Siesta.Result.Assertion or Siesta.Result.Diagnostic classes
             */
            this.fireEvent('testupdate', this, result)

            this.lastActivityDate = new Date();
        },
        

        /**
         * This method output the diagnostic message.  
         * @param {String} desc The text of diagnostic message
         */
        diag : function (desc) {
            this.addResult(new Siesta.Result.Diagnostic({
                description : desc
            }))
        },
        
        
        /**
         * This method add the passed assertion to this test.
         * 
         * @param {String} desc The description of the assertion
         * @param {String} annotation The additional description how exactly this assertion passes. Will be shown with monospace font.
         */
        pass : function (desc, annotation, result) {
            if (result) {
                result.passed       = true
                result.description  = desc
                result.annotation   = annotation
            }
            
            this.addResult(result || new Siesta.Result.Assertion({
                passed      : true,
                
                annotation  : annotation,
                description : desc
            }))
        },
        
        
        /**
         * This method returns a result of `Object.prototype.toString` applied to the passed argument. The `[object` and trailing `]` are trimmed. 
         * 
         * @param {Mixed} object
         * @return {String} The name of the "type" for this object.
         */
        typeOf : function (object) {
            return Object.prototype.toString.call(object).replace(/^\[object /, '').replace(/\]$/, '')
        },
        
        /**
         * This method add the failed assertion to this test.
         * 
         * @param {String} desc The description of the assertion
         * @param {String/Object} annotation The additional description how exactly this assertion fails. Will be shown with monospace font.
         * 
         * Can be either string or an object with the following properties. In the latter case a string will be constructed from the properties of the object.
         * 
         * - `assertionName` - the name of assertion, will be shown in the 1st line, along with originating source line (in FF and Chrome only)
         * - `got` - an arbitrary JavaScript object, when provided will be shown on the next line
         * - `need` - an arbitrary JavaScript object, when provided will be shown on the next line
         * - `gotDesc` - a prompt for "got", default value is "Got", but can be for example: "We have" 
         * - `needDesc` - a prompt for "need", default value is "Need", but can be for example: "We need"
         * - `annotation` - A text to append on the last line, can contain some additional explanations
         * 
         *  The "got" and "need" values will be stringified to the "not quite JSON" notation. Notably the points of circular references will be 
         *  marked with `[Circular]` marks and the values at 4th (and following) level of depth will be marked with triple points: `[ [ [ ... ] ] ]`  
         */
        fail : function (desc, annotation, result) {
            var sourceLine          = (annotation && annotation.sourceLine) || this.getSourceLine()
            
            if (annotation && this.typeOf(annotation) != 'String') {
                var strings             = []
                
                var params              = annotation
                var annotation          = params.annotation
                var assertionName       = params.assertionName
                var hasGot              = params.hasOwnProperty('got')
                var hasNeed             = params.hasOwnProperty('need')
                var gotDesc             = params.gotDesc || 'Got'
                var needDesc            = params.needDesc || 'Need'
                
                if (!params.ownTextOnly && (assertionName || sourceLine)) strings.push(
                    'Failed assertion ' + (assertionName ? '[' + assertionName + '] ' : '') + this.formatSourceLine(sourceLine)
                )
                
                if (hasGot && hasNeed) {
                    var max         = Math.max(gotDesc.length, needDesc.length)
                    
                    gotDesc         = this.appendSpaces(gotDesc, max - gotDesc.length + 1)
                    needDesc        = this.appendSpaces(needDesc, max - needDesc.length + 1)
                }
                
                if (hasGot)     strings.push(gotDesc   + ': ' + Siesta.Util.Serializer.stringify(params.got))
                if (hasNeed)    strings.push(needDesc  + ': ' + Siesta.Util.Serializer.stringify(params.need))
                
                if (annotation) strings.push(annotation)
                
                annotation      = strings.join('\n')
            }
            
            if (result) {
                // Failing a pending waitFor operation
                result.name         = assertionName;
                result.passed       = false;
                result.sourceLine   = sourceLine;
                result.annotation   = annotation;
                result.description  = desc;
            }
            
            this.addResult(result || new Siesta.Result.Assertion({
                name        : assertionName,
                passed      : false,
                sourceLine  : sourceLine,
            
                annotation  : annotation,
                description : desc
            }))

            if (this.harness.activateDebuggerOnFail) {
                debugger;
            }

            if (this.harness.breakOnFail) {
                this.finalize(true);
                throw 'Assertion failed, test execution aborted';
            }
        },

        
        getSource : function () {
            return this.contentManager.getContentOf(this.url)
        },
        
        
        getSourceLine : function () {
            try {
                throw new Error()
            } catch (e) {
                if (e.stack) {
                    var match       = e.stack.match(this.urlExtractRegex())
                    
                    if (match) return match[ 1 ]
                }
                
                // TODO
//                if (typeof console != 'udefined' && console.trace) {
//                    var trace = console.trace()
//                }
                
                return null
            }
        },
        
        
        getStartTestAnchor : function () {
            return this.startTestAnchor
        },
        
        
        getExceptionCatcher : function () {
            return this.exceptionCatcher
        },
        
        
        getTestErrorClass : function () {
            return this.testErrorClass
        },

        
        processCallbackFromTest : function (callback, args, scope) {
            var me      = this

            if (!callback) return true;

            if (this.transparentEx) {
                callback.apply(scope || this.global, args || [])
            } else {
                var e = this.getExceptionCatcher()(function(){
                    callback.apply(scope || me.global, args || [])
                })
            
                if (e) {
                    this.failWithException(e)
                    
                    // flow should be interrupted - exception detected
                    return false
                }
            }
            
            // flow can be continued
            return true
        },

        
        getStackTrace : function (e) {
            if (Object(e) !== e)    return null
            if (!e.stack)           return null
            
            var text            = e.stack + '';
            var isFirefox       = /^@/.test(text)
            var lines           = text.split('\n')
            
            var result          = []
            var match
            
            for (var i = 0; i < lines.length; i++) {
                if (!lines[ i ]) continue
                
                if (!i) {
                    if (isFirefox) 
                        result.push(e + '')
                    else {
                        result.push(lines[ i ])
                        continue;
                    }
                }
            
                if (isFirefox) {
                    match       = /@(.*?):(\d+)/.exec(lines[ i ]);
                    
                    // the format of stack trace in Firefox has changed, 080_exception_parsing should fail
                    if (!match) return null
                    
                    result.push('    at line ' + match[ 2 ] + ' of ' + match[ 1 ])
                } else {
                    match       = /\s*at\s(.*?):(\d+):(\d+)/.exec(lines[ i ]);
                    
                    // the format of stack trace in Chrome has changed, 080_exception_parsing should fail
                    if (!match) return null
                    
                    result.push('    at line ' + match[ 2 ] + ', character ' + match[ 3 ] + ', of ' + match[ 1 ])
                }
            }
                
            if (!result.length) return null
            
            return result
        },
        
        
        formatSourceLine : function (sourceLine) {
            return sourceLine ? 'at line ' + sourceLine + ' of ' + this.url : ''
        },
        
        
        appendSpaces : function (str, num) {
            var spaces      = ''
            
            while (num--) spaces += ' '
            
            return str + spaces
        },
        
        
        eachAssertion : function (func, scope) {
            scope       = scope || this
            
            var index   = 0
            
            Joose.A.each(this.results, function (result) {
                // check for class name for cross-context instances (happens during self-testing)
                if ((result instanceof Siesta.Result.Assertion) || result.meta.name == 'Siesta.Result.Assertion') func.call(scope, result, index++)
            })
        },
        
        
        /**
         * This assertion passes when the supplied `value` evalutes to `true` and fails otherwise.
         *  
         * @param {Mixed} value The value, indicating wheter assertions passes or fails
         * @param {String} desc The description of the assertion
         */
        ok : function (value, desc) {
            if (value) 
                this.pass(desc)
            else 
                this.fail(desc, {
                    assertionName       : 'ok', 
                    got                 : value, 
                    annotation          : 'Need "truthy" value'
                })
        },
        
        
        notok : function () {
            this.notOk.apply(this, arguments)
        },
        
        /**
         * This assertion passes when the supplied `value` evalutes to `false` and fails otherwise.
         * 
         * It has a synonym - `notok`.
         *  
         * @param {Mixed} value The value, indicating wheter assertions passes or fails
         * @param {String} desc The description of the assertion
         */
        notOk : function (value, desc) {
            if (!value) 
                this.pass(desc)
            else 
                this.fail(desc, {
                    assertionName       : 'notOk', 
                    got                 : value, 
                    annotation          : 'Need "falsy" value'
                })
        },
        
        
        /**
         * This assertion passes when the comparison of 1st and 2nd arguments with `==` operator returns true and fails otherwise.
         * 
         * @param {Mixed} got The value "we have" - will be shown as "Got:" in case of failure
         * @param {Mixed} expected The value "we expect" - will be shown as "Need:" in case of failure
         * @param {String} desc The description of the assertion
         */
        is : function (got, expected, desc) {
            if (expected && got instanceof this.global.Date) {
                this.isDateEqual(got, expected, desc);
            } else if (got == expected)
                this.pass(desc)
            else
                this.fail(desc, {
                    assertionName       : 'is', 
                    got                 : got, 
                    need                : expected 
                })
        },
        

        
        isnot : function () {
            this.isNot.apply(this, arguments)
        },

        isnt : function () {
            this.isNot.apply(this, arguments)
        },
        
        
        /**
         * This assertion passes when the comparison of 1st and 2nd arguments with `!=` operator returns true and fails otherwise.
         * It has synonyms - `isnot` and `isnt`.
         * 
         * @param {Mixed} got The value "we have" - will be shown as "Got:" in case of failure
         * @param {Mixed} expected The value "we expect" - will be shown as "Need:" in case of failure
         * @param {String} desc The description of the assertion
         */
        isNot : function (got, expected, desc) {
            if (got != expected)
                this.pass(desc)
            else
                this.fail(desc, {
                    assertionName       : 'isnt', 
                    got                 : got, 
                    need                : expected,
                    needDesc            : 'Need, not'
                })
        },
        

        /**
         * This assertion passes when the comparison of 1st and 2nd arguments with `===` operator returns true and fails otherwise.
         * 
         * @param {Mixed} got The value "we have" - will be shown as "Got:" in case of failure
         * @param {Mixed} expected The value "we expect" - will be shown as "Need:" in case of failure
         * @param {String} desc The description of the assertion
         */
        isStrict : function (got, expected, desc) {
            if (got === expected)
                this.pass(desc)
            else
                this.fail(desc, {
                    assertionName       : 'isStrict', 
                    got                 : got, 
                    need                : expected,
                    needDesc            : 'Need strictly'
                })
        },

        
        isntStrict : function () {
            this.isNotStrict.apply(this, arguments)
        },
        
        /**
         * This assertion passes when the comparison of 1st and 2nd arguments with `!==` operator returns true and fails otherwise.
         * It has synonyms - `isntStrict`.
         * 
         * @param {Mixed} got The value "we have" - will be shown as "Got:" in case of failure
         * @param {Mixed} expected The value "we expect" - will be shown as "Need:" in case of failure
         * @param {String} desc The description of the assertion
         */
        isNotStrict : function (got, expected, desc) {
            if (got !== expected)
                this.pass(desc)
            else
                this.fail(desc, {
                    assertionName       : 'isntStrict', 
                    got                 : got, 
                    need                : expected,
                    needDesc            : 'Need, strictly not'
                })
        },
        
        
        /**
         * This method starts the "asynchronous frame". The test will wait for all asynchronous frames to complete before it will finalize.
         * The frame can be finished with the {@link #endWait} call. Unlike the {@link #beginAsync}, this method requires you to provide
         * the unique id for the asynchronous frame. 
         * 
         * For example:
         * 
         *      t.wait("require")
         *      
         *      Ext.require('Some.Class', function () {
         *      
         *          t.ok(Some.Class, 'Some class was loaded')
         *          
         *          t.endWait("require")
         *      })
         * 
         * 
         * @param {String} title The unique id for the asynchronous frame.
         * @param {String} howLong The maximum time (in ms) to wait until force the finalization of this async frame. Optional. Default time is 15000 ms.
         */
        wait : function (title, howLong) {
            if (this.waitTitles.hasOwnProperty(title)) throw new Error("Already doing a `wait` with title [" + title + "]")
            
            return this.waitTitles[ title ] = this.beginAsync(howLong)
        },
        
        
        /**
         * This method finalize the "asynchronous frame" started with {@link #wait}.
         * 
         * @param {String} title The id of frame to finalize, which was previously passed to {@link #wait} method
         */
        endWait : function (title) {
            if (!this.waitTitles.hasOwnProperty(title)) throw new Error("There were no call to `wait` with title [" + title + "]")
            
            this.endAsync(this.waitTitles[ title ])
            
            delete this.waitTitles[ title ]
        },
        
        
        
        /**
         * This method starts the "asynchronous frame". The test will wait for all asynchronous frames to complete before it will finalize.
         * The frame should be finished with the {@link #endAsync} call within the provided `time`, otherwise a failure will be reported. 
         * 
         * For example:
         * 
         *      var async = t.beginAsync()
         *      
         *      Ext.require('Some.Class', function () {
         *      
         *          t.ok(Some.Class, 'Some class was loaded')
         *          
         *          t.endAsync(async)
         *      })
         * 
         * 
         * @param {Number} time The maximum time (in ms) to wait until force the finalization of this async frame. Optional. Default time is 15000 ms.
         * @param {Function} errback Optional. The function to call in case the call to {@link #endAsync} was not detected withing `time`. If function
         * will return any "truthy" value, the failure will not be reported (you can report own failure with this errback).
         *  
         * @return {Object} The frame object, which can be used in {@link #endAsync} call
         */
        beginAsync : function (time, errback) {
            time                        = time || this.defaultTimeout
            
            var me                      = this
            var originalSetTimeout      = this.originalSetTimeout
            
            var index                   = this.timeoutsCount++
            
            // in NodeJS `setTimeout` returns an object and not a simple ID, so we try hard to store that object under unique index
            // also using `setTimeout` from the scope of test - as timeouts in different scopes in browsers are mis-synchronized
            // can't just use `this.originalSetTimeout` because of scoping issues
            var timeoutId               = originalSetTimeout(function () {
                
                if (me.hasAsyncFrame(index)) {
                    if (!errback || !errback.call(me, me)) me.fail('No matching `endAsync` call within ' + time + 'ms')
                    
                    me.endAsync(index)
                }
            }, time)
            
            this.timeoutIds[ index ]    = timeoutId
            
            return index
        },
        
        
        hasAsyncFrame : function (index) {
            return this.timeoutIds.hasOwnProperty(index)
        },
        
        
        /**
         * This method finalize the "asynchronous frame" started with {@link #beginAsync}.
         * 
         * @param {Object} frame The frame to finalize (returned by {@link #beginAsync} method
         */
        endAsync : function (index) {
            var originalSetTimeout      = this.originalSetTimeout
            var originalClearTimeout    = this.originalClearTimeout || this.global.clearTimeout
            var counter = 0
            
            if (index == null) Joose.O.each(this.timeoutIds, function (timeoutId, indx) {
                index = indx
                if (counter++) throw new Error("Calls to endAsync without argument should only be performed if you have single beginAsync statement") 
            })
            
            var timeoutId               = this.timeoutIds[ index ]
            
            // need to call in this way for IE < 9
            originalClearTimeout(timeoutId)
            delete this.timeoutIds[ index ]
            
            var me = this
            
            if (this.processed && !this.isFinished())
                // to allow potential call to `done` after `endAsync`
                originalSetTimeout(function () {
                    me.finalize()
                }, 1)
        },
        
        
        clearTimeouts : function () {
            var originalClearTimeout    = this.originalClearTimeout
            
            Joose.O.each(this.timeoutIds, function (value, id) {
                originalClearTimeout(value)
            })
            
            this.timeoutIds = {}
        },
        
        
        // deprecated
        skipIf : function (condition, why, code, howMany) {
            howMany = howMany || 1
            
            if (condition) {
                
                for (var i = 1; i <= howMany; i++) this.addResult(new Siesta.Result.Assertion({
                    passed      : true,
                    isSkipped   : true,
                    
                    description : 'SKIPPED: ' + why
                }))    
                
            } else
                code()
        },
        
        
        // deprecated
        skip : function (why, code, howMany) {
            this.skipIf(true, why, code, howMany)
        },
        
        
        /**
         * With this method you can mark a group of assertions as "todo", assuming they most probably will fail, 
         * but its still worth to try run them.
         * The supplied `code` function will be run, it will receive a new test instance as the 1st argument,
         * which should be used for assertions checks (and not the primary test instance, received from `StartTest`).
         * 
         * Assertions, failed inside the `code` block will be still treated by harness as "green".
         * Assertions, passed inside the `code` block will be treated by harness as bonus ones and highlighted.
         *
         * See also {@link Siesta.Test.ExtJS#knownBugIn} method.
         *
         * For example:

    t.todo('Scheduled for 4.1.x release', function (todo) {
    
        var treePanel    = new Ext.tree.Panel()
    
        todo.is(treePanel.getView().store, treePanel.store, 'NodeStore and TreeStore have been merged and there's only 1 store now);
    })

         * @param {String} why The reason/description for the todo
         * @param {Function} code A function, wrapping the "todo" assertions. This function will receive a special test class instance
         * which should be used for assertions checks
         */
        todo : function (why, code) {
            if (this.typeOf(why) == 'Function') why = [ code, code = why ][ 0 ]
            
            var todo  = new this.constructor({
                trait       : Siesta.Test.Todo,
                
                parent      : this,
                
                global      : this.global,
                url         : this.url,
                harness     : this.harness,
                run         : function () {},
                
                overrideSetTimeout      : false,
                originalSetTimeout      : this.originalSetTimeout,
                originalClearTimeout    : this.originalClearTimeout
            })
            
            var exception = this.getExceptionCatcher()(function(){
                code(todo)
            })
            
            todo.global                 = null
            todo.originalSetTimeout     = null
            todo.originalClearTimeout   = null
            
            if (exception !== undefined) this.diag("TODO section threw an exception: [" + exception + "]")
        },
        
        
        failWithException : function (e) {
            this.failed             = true
            this.failedException    = e
            
            this.harness.onTestFail(this, e, this.getStackTrace(e))
            
            /**
             * This event is fired when the individual test case has threw an exception. 
             * 
             * This event bubbles up to the {@link Siesta.Harness harness}, you can observe it on harness as well.
             * 
             * @event testfailedwithexception
             * @member Siesta.Test
             * @param {JooseX.Observable.Event} event The event instance
             * @param {Siesta.Test} test The test instance that just has threw an exception
             * @param {Object} exception The exception thrown
             */
            this.fireEvent('testfailedwithexception', this, e);
            
            this.finalize(true)
        },
        
        
        start : function (alreadyFailedWithException) {
            if (this.startDate) {
                throw 'Test has already been started';
            }

            this.startDate  = new Date()
            
            this.harness.onTestStart(this)
            
            /**
             * This event is fired when the individual test case starts. When *started*, test may still be waiting for the {@link #isReady} conditions
             * to be fullfilled. Once all conditions will be fullfilled, test will be *launched*.
             * 
             * This event bubbles up to the {@link Siesta.Harness harness}, you can observe it on harness as well. 
             * 
             * @event teststart
             * @member Siesta.Test
             * @param {JooseX.Observable.Event} event The event instance
             * @param {Siesta.Test} test The test instance that just has started
             */
            this.fireEvent('teststart', this);
            
            if (alreadyFailedWithException) {
                this.failWithException(alreadyFailedWithException) 
                
                return
            }

            var me              = this;
            var errorMessage; 
            var readyRes        = me.isReady();
            
            if (readyRes.ready) {
                // We're ready to go
                me.launch();
            } else {
                // Need to wait for isReady to give green light
                var timeout         = setTimeout(function () {
                    clearInterval(interval)
                    me.launch(errorMessage)
                    
                }, me.isReadyTimeout)
                
                var interval = setInterval(function(){ 
                    readyRes = me.isReady();
                
                    if (readyRes.ready) {
                        clearInterval(interval)
                        clearTimeout(timeout)
                        me.launch();
                    } else {
                        errorMessage = readyRes.reason || errorMessage;
                    }
                }, 100);
            }
        },
            

        launch : function (errorMessage) {
            if (errorMessage) {
                this.fail('Wait for test start condition took too long', {
                    annotation      : errorMessage
                })
            }
            
            var me                      = this
            var global                  = this.global
            
            var originalSetTimeout      = this.originalSetTimeout
            var originalClearTimeout    = this.originalClearTimeout
            
            // this.overrideSetTimeout
            if (this.overrideSetTimeout) {
                // see http://www.adequatelygood.com/2011/4/Replacing-setTimeout-Globally
                this.scopeProvider.runCode('var setTimeout, clearTimeout;')
                
                global.setTimeout = function (func, delay) {
                    
                    var index = me.timeoutsCount++
                    
                    // in NodeJS `setTimeout` returns an object and not a simple ID, so we try hard to store that object under unique index
                    // also using `setTimeout` from the scope of test - as timeouts in different scopes in browsers are mis-synchronized
                    var timeoutId = originalSetTimeout(function () {
                        originalClearTimeout(timeoutId)
                        delete me.timeoutIds[ index ]
                        
                        // if the test func has been executed, but the test was not finalized yet - then we should try to finalize it
                        if (me.processed && !me.isFinished())
                            // we are doing that after slight delay, potentially allowing to setup some other async frames in the "func" below
                            originalSetTimeout(function () {
                                me.finalize()
                            }, 1)
                        
                        func()
                        
                    }, delay)
    
                    // in NodeJS saves the index of the timeout descriptor to the descriptor
                    if (typeof timeoutId == 'object') 
                        timeoutId.__index = index
                    else
                        // in browser (where `timeoutId` is a number) - to the `idsToIndex` hash
                        me.idsToIndex[ timeoutId ] = index
                        
                    return me.timeoutIds[ index ] = timeoutId
                }
                
                global.clearTimeout = function (id) {
                    if (id == null) return
                    
                    var index
                    
                    // in NodeJS `setTimeout` returns an object and not a simple ID
                    if (typeof id == 'object') {
                        index       = id.__index
                        if (me.timeoutIds[ index ] != id) throw "Incorrect state"
                    } else {
                        index       = me.idsToIndex[ id ]
                        
                        delete me.idsToIndex[ id ]
                    }
                    
                    originalClearTimeout(id)
                    
                    if (index != null) delete me.timeoutIds[ index ]
                    
                    // if the test func has been executed, but the test was not finalized yet - then we should try to finalize it
                    if (me.processed && !me.isFinished())
                        // we are doing that after slight delay, potentially allowing to setup some other async frames after the "clearTimeout" will complete
                        originalSetTimeout(function () {
                            me.finalize()
                        }, 1)
                }
            }
            // eof this.overrideSetTimeout
            
            // we only don't need to cleanup up when doing a self-testing
            if (this.needToCleanup) this.scopeProvider.cleanupCallback = function () {
                if (me.overrideSetTimeout) {
                    global.setTimeout       = originalSetTimeout
                    global.clearTimeout     = originalClearTimeout
                }
                
                originalSetTimeout          = me.originalSetTimeout         = null
                originalClearTimeout        = me.originalClearTimeout       = null
                
                me.global                   = global                        = null
                me.run                      = run                           = null
                me.exceptionCatcher         = me.testErrorClass             = null
                me.startTestAnchor                                          = null
            }
            
            var run     = this.run
            
            if (this.transparentEx)
                run(me)
            else 
                var e = this.getExceptionCatcher()(function(){
                    run(me)
                })
            
            if (e) {
                this.failWithException(e)
                
                return
            } 
            
            this.finalize()
        },
        
        
        finalize : function (force) {
            if (this.isFinished()) return
            
            this.processed = true
            
            if (force) this.clearTimeouts()
            
            if (!Joose.O.isEmpty(this.timeoutIds)) {
                if (
                    !this.__timeoutWarning && this.overrideSetTimeout && this.lastActivityDate &&
                    new Date() - this.lastActivityDate > this.defaultTimeout * 2
                ) {
                    this.diag('Your test is still considered to be running, if this is unexpected please see console for more information');
                    this.warn('Your test [' + this.url + '] has not finalized, most likely since a timer (setTimeout) is still active. ' + 
                              'If this is the expected behavior, try setting "overrideSetTimeout : false" on your Harness configuration.');
                    this.__timeoutWarning = true;
                }

                return
            }

            if (!this.needDone && !this.isDone) {
                this.fireEvent('beforetestfinalizeearly')
                
                /**
                 * This event is fired before the individual test case ends (no any corresponded harness actions will be run yet).
                 * 
                 * This event bubbles up to the {@link Siesta.Harness harness}, you can observe it on harness as well.
                 * 
                 * @event beforetestfinalize
                 * @member Siesta.Test
                 * @param {JooseX.Observable.Event} event The event instance
                 * @param {Siesta.Test} test The test instance that is about to finalize
                 */
                this.fireEvent('beforetestfinalize');
            }
            
            this.endDate = new Date()

            this.harness.onTestEnd(this)
            
            /**
             * This event is fired when the individual test case ends (either because it has completed correctly and threw an exception).
             * 
             * This event bubbles up to the {@link Siesta.Harness harness}, you can observe it on harness as well.
             * 
             * @event testfinalize
             * @member Siesta.Test
             * @param {JooseX.Observable.Event} event The event instance
             * @param {Siesta.Test} test The test instance that just has completed
             */
            this.fireEvent('testfinalize', this);
            
            this.callback && this.callback()
        },
        
        
        getSummaryMessage : function (lineBreaks) {
            var res = []
            
            var passCount       = this.getPassCount()
            var failCount       = this.getFailCount()
            var assertPlanned   = this.assertPlanned
            var total           = failCount + passCount
            
            res.push('Passed: ' + passCount)
            res.push('Failed: ' + failCount)
            
            if (!this.failed) {
                // there was a t.plan() call
                if (assertPlanned != null) {
                    if (total < assertPlanned) 
                        res.push('Looks like you planned ' + assertPlanned + ' tests, but ran only ' + total)
                        
                    if (total > assertPlanned) 
                        res.push('Looks like you planned ' + assertPlanned + ' tests, but ran ' +  (total - assertPlanned) + ' extra tests, ' + total + ' total.')
                    
                    if (total == assertPlanned && !failCount) res.push('All tests passed')
                } else {
                    if (!this.isDoneCorrectly()) res.push('Test has completed, but there was no `t.done()` call. Add it at the bottom, or use `t.beginAsync()` for asynchronous code')
                    
                    if (this.isDoneCorrectly() && !failCount) res.push('All tests passed')
                }
                
            } else {
                var stack = this.getStackTrace(this.failedException)
                if (stack)
                    res.push.apply(res, [ 'Test suite threw an exception: ' + this.failedException].concat(stack))
                else
                    res.push('Test suite threw an exception: ' + this.failedException)
            }
            
            return res.join(lineBreaks || '\n')
        },
        
        
        /**
         * This method indicates that test has completed at the expected point and no more assertions are planned. Adding assertions after the call to `done`
         * will add a failing assertion "Adding assertion after test completion".
         * 
         * @param {Number} delay Optional. When provided, the test will not complete right away, but will wait for `delay` milliseconds for additional assertions. 
         */
        done : function (delay) {
            var me      = this
            
            if (delay) {
                var async = this.beginAsync()
                
                var originalSetTimeout = this.originalSetTimeout
                
                originalSetTimeout(function () {
                    
                    me.endAsync(async)
                    me.done() 
                
                }, delay)
                
            } else {
                this.fireEvent('beforetestfinalizeearly')
                this.fireEvent('beforetestfinalize');
                
                this.isDone = true
                
                if (this.processed) this.finalize()
            }
        },
        
        // `isDoneCorrectly` means that either test does not need the call to `done`
        // or the call to `done` has been already made
        isDoneCorrectly : function () {
            return !this.needDone || this.isDone
        },
        
        
        getPassCount : function () {
            var passCount = 0
            
            this.eachAssertion(function (assertion) {
                if (assertion.passed && !assertion.isTodo) passCount++
            })
            
            return passCount
        },

        getTodoPassCount : function () {
            var todoCount = 0;
            
            this.eachAssertion(function (assertion) {
                if (assertion.isTodo && assertion.passed) todoCount++;
            });
            
            return todoCount;
        },

        getTodoFailCount : function () {
            var todoCount = 0;
            
            this.eachAssertion(function (assertion) {
                if (assertion.isTodo && !assertion.passed) todoCount++;
            });
            
            return todoCount;
        },
        
        
        getFailCount : function () {
            var failCount = 0
            
            this.eachAssertion(function (assertion) {
                if (!assertion.passed && !assertion.isTodo) failCount++
            })
            
            return failCount
        },
        
        
        isPassed : function () {
            var passCount       = this.getPassCount()
            var failCount       = this.getFailCount()
            var assertPlanned   = this.assertPlanned
            
            return this.isFinished() && !this.failed && !failCount && (
                assertPlanned != null && passCount == assertPlanned
                    ||
                assertPlanned == null && this.isDoneCorrectly()
            )
        },
        
        
        isFailed : function () {
            var passCount       = this.getPassCount()
            var failCount       = this.getFailCount()
            var assertPlanned   = this.assertPlanned
            
            return this.failed || failCount || (
            
                this.isFinished() && ( 
                    assertPlanned != null && passCount != assertPlanned
                        ||
                    assertPlanned == null && !this.isDoneCorrectly()
                )
            )
        },
        
        
        isFailedWithException : function () {
            return this.failed
        },
        
        
        isStarted : function () {
            return this.startDate != null
        },
        
        
        isFinished : function () {
            return this.endDate != null
        },
        
        
        getDuration : function () {
            return this.endDate - this.startDate
        },
        
        getBubbleTarget : function () {
            return this.harness;
        },
        
        
        warn : function (message) {
            this.addResult(new Siesta.Result.Diagnostic({
                description : message,
                isWarning   : true
            }))
        }
    }
        
})
//eof Siesta.Test;
Role('Siesta.Test.Todo', {
    
    has : {
        parent              : null
    },
    
    
    methods : {
        
        getExceptionCatcher : function () {
            return this.parent.getExceptionCatcher()
        },
        
        
        getTestErrorClass : function () {
            return this.parent.getTestErrorClass()
        },
        
        
        getStartTestAnchor : function () {
            return this.parent.getStartTestAnchor()
        },
        
        
        addResult : function (result) {
            if (result instanceof Siesta.Result.Assertion) result.isTodo = true
            
            this.parent.addResult(result)
        },
        
        
        beginAsync : function (time) {
            return this.parent.beginAsync(time)
        },
        
        
        endAsync : function (index) {
            return this.parent.endAsync(index)
        }
        
    }
        
})
//eof Siesta.Test
;
/**
@class Siesta.Test.Action

*/
Class('Siesta.Test.ActionRegistry', {
    
    my : {
    
        has : {
            actionClasses       : Joose.I.Object
        },
    
        
        methods : {
            
            registerAction : function (name, constructor) {
                this.actionClasses[ name.toLowerCase() ] = constructor
            },

            
            getActionClass : function (name) {
                return this.actionClasses[ name.toLowerCase() ]
            },
            
            
            create : function (obj) {
                if (!obj.action && !obj.waitFor && !obj.verify) throw "Need to include `action`, `verify` or `waitFor` property in the step config"
                
                var actionClass = this.getActionClass((obj.waitFor && "wait") || obj.action || "verify");

                return new actionClass(obj)
            }
        }
    }
});
;
/**
@class Siesta.Test.Action

Base class for {@link Siesta.Test#chain} actions.

*/
Class('Siesta.Test.Action', {
    
    has : {
        args                : null, 
        
        /**
         * @cfg {String} desc When provided, once step is completed, a passing assertion with this text will be added to a test.
         * This configuration option can be useful to indicate the progress of "wait" steps  
         */
        desc                : null,
        test                : { required : true },
        next                : { required : true },
        
        requiredTestMethod  : null
    },

    
    methods : {
        
        initialize : function () {
            var requiredTestMethod  = this.requiredTestMethod
            
            // additional sanity check
            if (requiredTestMethod && !this.test[ requiredTestMethod ]) 
                throw new Error("Action [" + this + "] requires `" + requiredTestMethod + "` method in your test class") 
        },
        
        
        process : function () {
            this.next()
        }
    }
});
;
/**

@class Siesta.Test.Action.Done
@extends Siesta.Test.Action

This action can be included in the `t.chain` call with "done" shortcut:

    t.chain(
        {
            action      : 'done'
        }
    )

This action will just call the {@link Siesta.Test#done done} method of the test.

*/
Class('Siesta.Test.Action.Done', {
    
    isa         : Siesta.Test.Action,
    
    has : {
        /**
         * @cfg {Number} delay
         * 
         * An optional `delay` argument for {@link Siesta.Test#done done} call.
         */
        delay  :        null
    },

    
    methods : {
        
        process : function () {
            this.test.done(this.delay)
            
            this.next()
        }
    }
});


Siesta.Test.ActionRegistry.registerAction('done', Siesta.Test.Action.Done);
/**

@class Siesta.Test.Action.Wait
@extends Siesta.Test.Action

This action can be included in the `t.chain` call with "wait" or "delay" shortcuts:

    t.chain(
        {
            action      : 'wait',   // or "delay"
            delay       : 1000      // 1 second
        }
    )

Alternatively, for convenience, this action can be included in the chain using "waitFor" config (the "action" property can be omitted):

    t.chain(
        {
            waitFor     : 'selector',           // or any other waitFor* method name
            args        : [ '.x-grid-row' ]     // an array of arguments for the specified method
        }
    )
    
    t.chain(
        {
            waitFor     : 'rowsVisible',        // or any other waitFor* method name
            args        : [ grid ]              // an array of arguments for the specified method
        }
    )
    
    t.chain(
        {
            waitFor     : 'waitForRowsVisible', // full method name is also ok
            args        : grid                  // a single value will be converted to array automatically
        }
    )
    
In the latter case, this action will perform a call to the one of the `waitFor*` methods of the test instance.
The name of the method is computed by prepending the uppercased value of `waitFor` config with the string "waitFor" 
(unless it doesn't already starts with "waitFor").
The arguments for method call can be provided as the "args" array. Any non-array value for "args" will be converted to an array with one element.
* **Note**, that this action will provide a `callback`, `scope`, and `timeout` arguments for `waitFor*` methods - you should not specify them. 


As a special case, the value of `waitFor` config can be a Number or Function - that will trigger the call to {@link Siesta.Test#waitFor} method with provided value:

    t.chain(
        {
            waitFor     : 500
        },
        // same as
        {
            waitFor     : '',
            args        : [ 500 ] 
        },
        {
            waitFor     : function () { return document.body.className.match(/someClass/) }
        }
    )

*/
Class('Siesta.Test.Action.Wait', {
    
    isa         : Siesta.Test.Action,
    
    has : {
        /**
         * @cfg {Number} delay
         * 
         * A number of milliseconds to wait before continuing.
         */
        delay           : 1000,
        
        /**
         * @cfg {Number} timeout
         * 
         * The maximum amount of time to wait for the condition to be fulfilled. Defaults to the {@link Siesta.Test.ExtJS#waitForTimeout} value. 
         */
        timeout         : null,

        /**
         * @cfg {Array} args
         * 
         * The array of arguments to pass to waitForXXX method. You should omit the 3 last parameters: callback, scope, timeout. Any non-array value will be converted to 
         * a single-value array. 
         */
        args            : null,

        /**
         * @cfg {String} waitFor
         * 
         * The name of the `waitFor` method to call. You can omit the leading "waitFor":
         * 

    t.chain(
        {
            waitFor     : 'selector',
            ...
        },
        // same as
        {
            waitFor     : 'waitForSelector',
            ...
        }
    )
         * 
         */
        waitFor         : null
    },

    
    methods : {
        
        process : function () {
            var waitFor     = this.waitFor;
            var test        = this.test

            if (test.typeOf(waitFor) === 'Number' || test.typeOf(waitFor) === 'Function') {
                // Caller supplied a function returning true when done waiting or
                // a number of milliseconds to wait for.
                this.args   = [ waitFor ];
                waitFor     = '';
            }
            
            if (waitFor == null) {
                this.args   = [ this.delay ];
                waitFor     = '';
            }
            
            if (test.typeOf(this.args) !== "Array") {
                this.args = [ this.args ];
            }

            // also allow full method names
            waitFor         = waitFor.replace(/^waitFor/, '')
            var methodName  = 'waitFor' + Joose.S.uppercaseFirst(waitFor);
            
            if (!test[methodName]){
                throw 'Could not find a waitFor method named ' + methodName;
            }

            // If using simple waitFor statement, use the object notation to be able to pass a description
            // which gives better debugging help than "Waited too long for condition to be fulfilled".
            if (methodName === 'waitFor') {
                test[methodName]({
                    method          : this.args[ 0 ],
                    callback        : this.next,
                    scope           : test,
                    timeout         : this.timeout || test.waitForTimeout,
                    description     : this.desc || ''
                });
            } else {
                test[methodName].apply(test, this.args.concat(this.next, test, this.timeout || test.waitForTimeout));
            }
        }
    }
});

Joose.A.each(['wait', 'delay'], function(name) {
    Siesta.Test.ActionRegistry.registerAction(name, Siesta.Test.Action.Wait);
});;
/**

@class Siesta.Test.Action.Eval
@extends Siesta.Test.Action

This action can be included in the `t.chain` steps only with a plain string. Siesta will examine the passed string,
and call an apropriate method of the test class. String should have the following format: 
    
    methodName(params) 

Method name is anything until the first parenthes. Method name may have an optional prefix `t.`. 
Everything in between of outermost parentheses will be treated as parameters for method call. For example:

    t.chain(
        // string should look like a usual method call, 
        // but arguments can't reference any variables
        // strings should be quoted, to include quoting symbol in string use double slash: \\
        't.click("combo[type=some\\"Type] => .x-form-trigger")',
        
        // leading "t." is optional, but quoting is not
        'waitForComponent("combo[type=someType]")',
        
        // JSON objects are ok, but they should be a valid JSON - ie object properties should be quoted
        'myClick([ 10, 10 ], { "foo" : "bar" })',
    )
    
* **Note** You can pass the JSON objects as arguments, but they should be serialized as valid JSON - ie object properties should be quoted.
    
* **Note** A callback for next step in chain will be always appended to provided parameters. Make sure it is placed in a correct spot!
For example if method signature is `t.someMethod(param1, param2, callback)` and you are calling this method as:
    
    t.chain(
        `t.someMethod("text")`
    )
it will fail - callback will be provided in place of `param2`. Instead call it as: 
    
    t.chain(
        `t.someMethod("text", null)`
    )

This action may save you few keystrokes, when you need to perform some action with static arguments (known prior the action).

*/
Class('Siesta.Test.Action.Eval', {
    
    isa         : Siesta.Test.Action,
    
    has : {
        /**
         * @cfg {Object} options
         *
         * Any options that will be used when simulating the event. For information about possible
         * config options, please see: https://developer.mozilla.org/en-US/docs/DOM/event.initMouseEvent
         */
        actionString        : null
    },

    
    methods : {
        
        process : function () {
            var test            = this.test
            var parsed          = this.parseActionString(this.actionString)
            
            if (parsed.error) {
                test.fail(parsed.error)
                this.next()
                return
            }
            
            var methodName      = parsed.methodName
            
            if (!methodName || test.typeOf(test[ methodName ]) != 'Function') {
                test.fail("Invalid method name: " + methodName)
                this.next()
                return
            }
            
            parsed.params.push(this.next)
            
            test[ methodName ].apply(test, parsed.params)
        },
        
        
        parseActionString : function (actionString) {
            var match           = /^\s*(.+?)\(\s*(.*)\s*\)\s*$/.exec(actionString)
            
            if (!match) return {
                error       : "Wrong format of the action string: " + actionString
            }
            
            var methodName      = match[ 1 ].replace(/^t\./, '')
            
            try {
                var params          = JSON.parse('[' + match[ 2 ] + ']')
            } catch (e) {
                return {
                    error       : "Can't parse arguments: " + match[ 2 ]
                }
            }
            
            return {
                methodName      : methodName,
                params          : params
            }
        }
    }
});
;
/**

@class Siesta.Harness
@mixin Siesta.Role.CanStyleOutput

`Siesta.Harness` is an abstract base harness class in Siesta hierarchy. This class provides no UI, 
you should use one of it subclasses, for example {@link Siesta.Harness.Browser}

This file is a reference only, for a getting start guide and manual, please refer to <a href="#!/guide/siesta_getting_started">Getting Started Guide</a>.


Synopsys
========

    var Harness,
        isNode        = typeof process != 'undefined' && process.pid
    
    if (isNode) {
        Harness = require('siesta');
    } else {
        Harness = Siesta.Harness.Browser;
    }
        
    
    Harness.configure({
        title     : 'Awesome Test Suite',
        
        transparentEx       : true,
        
        autoCheckGlobals    : true,
        expectedGlobals     : [
            'Ext',
            'Sch'
        ],
        
        preload : [
            "http://cdn.sencha.io/ext-4.0.2a/ext-all-debug.js",
            "../awesome-project-all.js",
            {
                text    : "console.log('preload completed')"
            }
        ]
    })
    
    
    Harness.start(
        // simple string - url relative to harness file
        'sanity.t.js',
        
        // test file descriptor with own configuration options
        {
            url     : 'basic.t.js',
            
            // replace `preload` option of harness
            preload : [
                "http://cdn.sencha.io/ext-4.0.6/ext-all-debug.js",
                "../awesome-project-all.js"
            ]
        },
        
        // groups ("folders") of test files (possibly with own options)
        {
            group       : 'Sanity',
            
            autoCheckGlobals    : false,
            
            items       : [
                'data/crud.t.js',
                ...
            ]
        },
        ...
    )


*/


Class('Siesta.Harness', {
    
    does        : [
        JooseX.Observable
    ],
    
    has : {
        /**
         * @cfg {String} title The title of the test suite. Can contain HTML. When provided in the test file descriptor - will change the name of test in the harness UI.
         */
        title               : null,
        
        /**
         * @cfg {Class} testClass The test class which will be used for creating test instances, defaults to {@link Siesta.Test}.
         * You can subclass {@link Siesta.Test} and provide a new class. 
         * 
         * This option can be also specified in the test file descriptor. 
         */
        testClass           : Siesta.Test,
        contentManagerClass : Siesta.Content.Manager,
        
        // fields of test descriptor:
        // - id - either `url` or wbs + group - computed
        // - url
        // - isMissing - true if test file is missing
        // - testConfig - config object provided to the StartTest
        // - index - (in the group) computed
        // - scopeProvider
        // - scopeProviderConfig
        // - preload
        // - alsoPreload
        // - parent - parent descriptor (or harness for top-most ones) - computed
        // - preset - computed by harness - instance of Siesta.Content.Preset
        // - forceDOMVisible - true to show the <iframe> on top of all others when running this test
        //                     (required for IE when using "document.getElementFromPoint()") 
        // OR - object 
        // - group - group name
        // - items - array of test descriptors
        // - expanded - initial state of the group (true by default)
        descriptors         : Joose.I.Array,
        descriptorsById     : Joose.I.Object,
        
        launchCounter       : 0,
        
        launches            : Joose.I.Object,
        
        scopesByURL         : Joose.I.Object,
        testsByURL          : Joose.I.Object,
        
        /**
         * @cfg {Boolean} transparentEx When set to `true` harness will not try to catch any exception, thrown from the test code.
         * This is very useful for debugging - you can for example use the "break on error" option in Firebug.
         * But, using this option may naturally lead to unhandled exceptions, which may leave the harness in incosistent state - 
         * refresh the browser page in such case.
         *  
         * Defaults to `false` - harness will do its best to detect any exception thrown from the test code.
         * 
         * This option can be also specified in the test file descriptor. 
         */
        transparentEx       : false,
        
        scopeProviderConfig     : null,
        scopeProvider           : null,
        
        /**
         * @cfg {String} runCore Either `parallel` or `sequential`. Indicates how the individual tests should be run - several at once or one-by-one.
         * Default value is "parallel". You do not need to change this option usually.
         */
        runCore                 : 'parallel',
        
        /**
         * @cfg {Number} maxThreads The maximum number of tests running at the same time. Only applicable for `parallel` run-core.
         */
        maxThreads              : 4,
        
        /**
         * @cfg {Boolean} autoCheckGlobals When set to `true`, harness will automatically issue an {@link Siesta.Test#verifyGlobals} assertion at the end of each test,
         * so you won't have to manually specify it each time. The assertion will be triggered only if test completed successfully. Default value is `false`.
         * See also {@link #expectedGlobals} configuration option and {@link Siesta.Test#expectGlobals} method.
         * 
         * This option will be always disabled in Opera, since every DOM element with `id` is being added as a global symbol in it.
         * 
         * This option can be also specified in the test file descriptor.
         */
        autoCheckGlobals        : false,
        
        disableGlobalsCheck     : false,
        
        /**
         * @cfg {Array} expectedGlobals An array of properties names which are likely to present in the scope of each test. There is no need to provide the name
         * of built-in globals - harness will automatically scan them from the empty context. Only provide the names of global properties which will be created
         * by your preload code.
         * 
         * For example
         * 
    Harness.configure({
        title               : 'Ext Scheduler Test Suite',
        
        autoCheckGlobals    : true,
        expectedGlobals     : [
            'Ext',
            'MyProject',
            'SomeExternalLibrary'
        ],
        ...
    })
            
         * This option can be also specified in the test file descriptor.
         */
        expectedGlobals         : Joose.I.Array,
        // will be populated by `populateCleanScopeGlobals` 
        cleanScopeGlobals       : Joose.I.Array,
        
        /**
         * @cfg {Array} preload The array which contains the *preload descriptors* describing which files/code should be preloaded into the scope of each test.
         * 
         * Preload descriptor can be:
         * 
         * - a string, containing an url to load (cross-domain urls are ok, if url ends with ".css" it will be loaded as CSS)
         * - an object `{ type : 'css/js', url : '...' }` allowing to specify the CSS files with different extension
         * - an object `{ type : 'css/js', content : '...' }` allowing to specify the inline content for script / style
         * - an object `{ text : '...' }` which is a shortcut for `{ type : 'js', content : '...' }`
         * 
         * For example:
         * 
    Harness.configure({
        title           : 'Ext Scheduler Test Suite',
        
        preload         : [
            'http://cdn.sencha.io/ext-4.0.2a/resources/css/ext-all.css',
            'http://cdn.sencha.io/ext-4.0.2a/ext-all-debug.js',
            {
                text    : 'MySpecialGlobalFunc = function () { if (typeof console != "undefined") ... }'
            }
        ],
        ...
    })
            
         * This option can be also specified in the test file descriptor.
         */
        preload                 : Joose.I.Array,
        
        /**
         * @cfg {Array} alsoPreload The array with preload descriptors describing which files/code should be preloaded **additionally**.
         * 
         * This option can be also specified in the test file descriptor.
         */
        
        /**
         * @cfg {Object} listeners The object which keys corresponds to event names and values - to event handlers. If provided, the special key "scope" will be treated as the 
         * scope for all event handlers, otherwise the harness itself will be used as scope.
         * 
         * Note, that the events from individual {@link Siesta.Test test cases} instances will bubble up to the harness - you can listen to all of them in one place: 
         * 

    Harness.configure({
        title     : 'Awesome Test Suite',
        
        preload : [
            'http://cdn.sencha.io/ext-4.1.0-gpl/resources/css/ext-all.css',
            'http://cdn.sencha.io/ext-4.1.0-gpl/ext-all-debug.js',
            
            'preload.js'
        ],
        
        listeners : {
            testsuitestart      : function (event, harness) {
                log('Test suite is starting: ' + harness.title)
            },
            testsuiteend        : function (event, harness) {
                log('Test suite is finishing: ' + harness.title)
            },
            teststart           : function (event, test) {
                log('Test case is starting: ' + test.url)
            },
            testupdate          : function (event, test, result) {
                log('Test case [' + test.url + '] has been updated: ' + result.description + (result.annotation ? ', ' + result.annotation : ''))
            },
            testfailedwithexception : function (event, test) {
                log('Test case [' + test.url + '] has failed with exception: ' + test.failedException)
            },
            testfinalize        : function (event, test) {
                log('Test case [' + test.url + '] has completed')
            }
        }
    })

         */
        
        
        /**
         * @cfg {Boolean} cachePreload When set to `true`, harness will cache the content of the preload files and provide it for each test, instead of loading it 
         * from network each time. This option may give a slight speedup in tests execution (especially when running the suite from the remote server), but see the 
         * caveats below. Default value is `false`.
         * 
         * Caveats: this option doesn't work very well for CSS (due to broken relative urls for images). Also its not "debugging-friendly" - as you will not be able 
         * to setup breakpoints for cached code. 
         */
        cachePreload            : false,
        
        mainPreset              : null,
        
        verbosity               : 0,
        
        /**
         * @cfg {Boolean} keepResults When set to `true`, harness will not cleanup the context of the test immediately. Instead it will do so, only when
         * the test will run again. This will allow you for example to examine the DOM of tests. Default value is `true` 
         */
        keepResults             : true,
        
        /**
         * @cfg {Number} keepNLastResults
         * 
         * Only meaningful when {@link #keepResults} is set to `false`. Indicates the number of the test results which still should be kept, for user examination.
         * Results are cleared when their total number exceed this value, based on FIFO order.
         */
        keepNLastResults        : 2,
        
        lastResultsURLs         : Joose.I.Array,
        lastResultsByURL        : Joose.I.Object,
        
        /**
         * @cfg {Boolean} overrideSetTimeout When set to `false`, the tests will not override "setTimeout" from the context of each test
         * for asynchronous code tracking. User will need to use `beginAsync/endAsync` calls to indicate that test is still running.
         * 
         * This option can be also specified in the test file descriptor.
         */
        overrideSetTimeout      : true,
        
        /**
         * @cfg {Boolean} needDone When set to `true`, the tests will must indicate that that they have reached the correct exit point with `t.done()` call, 
         * after which, adding any assertions is not allowed. Using this option will ensure that test did not exit prematurely with some exception silently caught.
         * 
         * This option can be also specified in the test file descriptor.
         */
        needDone                : false,
        
        needToStop              : false,
        
        // the default timeout for tests will be increased when launching more than this number of files
        increaseTimeoutThreshold    : 8,
        
        // the start and end dates for the most recent `launch` method
        startDate               : null,
        endDate                 : null,
        
        /**
         * @cfg {Number} waitForTimeout Default timeout for `waitFor` (in milliseconds). Default value is 10000.
         * 
         * This option can be also specified in the test file descriptor.
         */
        waitForTimeout          : 10000,
        
        /**
         * @cfg {Number} defaultTimeout Default timeout for `beginAsync` operation (in milliseconds). Default value is 15000.
         * 
         * This option can be also specified in the test file descriptor.
         */
        defaultTimeout          : 15000,
        
        
        /**
         * @cfg {Number} isReadyTimeout Default timeout for test start (in milliseconds). Default value is 15000. See {@link Siesta.Test#isReady} for details.
         * 
         * This option can be also specified in the test file descriptor.
         */
        isReadyTimeout          : 10000,
        
        /**
         * @cfg {Number} pauseBetweenTests Default timeout between tests (in milliseconds). Increase this settings for big test suites, to give browser time for memory cleanup.
         */
        pauseBetweenTests       : 300
    },
    
    
    methods : {
        
        onTestUpdate : function (test, result) {
        },
        
        
        onTestFail : function (test, exception, stack) {
        },
        
        
        onTestStart : function (test) {
        },
        
        
        onTestEnd : function (test) {
        },
        
        
        onTestSuiteStart : function (descriptors, contentManager) {
            this.startDate  = new Date()
            
            /**
             * This event is fired when the test suite starts. Note, that when running the test suite in the browsers, this event can be fired several times
             * (for each group of tests you've launched).  
             * 
             * You can subscribe to it, using regular ExtJS syntax:
             * 
             *      Harness.on('testsuitestart', function (event, harness) {}, scope, { single : true })
             * 
             * See also the "/examples/events"
             * 
             * @event testsuitestart
             * @member Siesta.Harness
             * @param {JooseX.Observable.Event} event The event instance
             * @param {Siesta.Harness} harness The harness that just has started
             */
            this.fireEvent('testsuitestart', this)
        },
        
        
        onTestSuiteEnd : function () {
            this.endDate    = new Date()
            
            /**
             * This event is fired when the test suite ends. Note, that when running the test suite in the browsers, this event can be fired several times
             * (for each group of tests you've launched).  
             * 
             * @event testsuiteend
             * @member Siesta.Harness
             * @param {JooseX.Observable.Event} event The event instance
             * @param {Siesta.Harness} harness The harness that just has ended
             */
            this.fireEvent('testsuiteend', this)
        },
        
        
        onBeforeScopePreload : function (scopeProvider, url) {
            this.fireEvent('beforescopepreload', scopeProvider, url)
        },
        
        
        onAfterScopePreload : function (scopeProvider, url) {
            this.fireEvent('afterscopepreload', scopeProvider, url)
        },
        
        
        onCachingError : function (descriptors, contentManager) {
        },
        
        
        /**
         * This method configures the harness instance. It just copies the passed configuration option into harness instance.
         *
         * @param {Object} config - configuration options (values of attributes for this class)
         */
        configure : function (config) {
            Joose.O.copy(config, this)
            
            var me      = this
            
            if (config.listeners) Joose.O.each(config.listeners, function (value, name) {
                if (name == 'scope') return
                
                me.on(name, value, config.scope || me)
            })
        },
        
        
        // backward compat
        processPreloadArray : function (preload) {
            var me = this
            
            Joose.A.each(preload, function (url, index) {
                
                // do not process { text : "" } preload descriptors
                if (Object(url) === url) return 
                
                preload[ index ] = me.normalizeURL(url)
            })
            
            return preload
        },
        
        
        populateCleanScopeGlobals : function (scopeProvider, callback) {
            var scopeProviderClass  = eval(scopeProvider)
            var cleanScope          = new scopeProviderClass()
            
            var cleanScopeGlobals   = this.cleanScopeGlobals        
            
            // we can also use "create" and not "setup" here
            // create will only create the iframe (in browsers) and will not try to update its content
            // the latter crashes IE8
            cleanScope.setup(function () {
                
                for (var name in cleanScope.scope) cleanScopeGlobals.push(name)
                
                callback()
                
                // this setTimeout seems to stop the spinning loading indicator in FF
                // accorting to https://github.com/3rd-Eden/Socket.IO/commit/bad600fb1fb70238f42767c56f01256470fa3c15
                // it only works *after* onload (this callback will be called *in* onload)
                
                setTimeout(function () {
                    // will remove the iframe (in case of browser harness) from DOM and stop loading indicator
                    cleanScope.cleanup()    
                }, 0)
            })
        },
        
        
        setup : function (callback) {
            this.populateCleanScopeGlobals(this.scopeProvider, callback)
        },
        
        /**
         * This method will launch a test suite. It accepts a variable number of *test file descriptors* or an array of such. A test file descritor is one of the following:
         * 
         * - a string, containing a test file url
         * - an object containing the `url` property `{ url : '...', option1 : 'value1', option2 : 'value2' }`. The `url` property should point to the test file.
         * Other properties can contain values of some configuration options of the harness (marked accordingly). In this case, they will **override** the corresponding values,
         * provided to harness or parent descriptor. 
         * - an object `{ group : 'groupName', items : [], expanded : true, option1 : 'value1' }` specifying the folder of test files. The `expanded` property
         * sets the initial state of the folder - "collapsed/expanded". The `items` property can contain an array of test file descriptors.
         * Other properties will override the applicable harness options **for all child descriptors**.
         * 
         * Groups (folder) may contain nested groups. Number of nesting levels is not limited.
         * 
         * For example, one may easily have a special group of test files, having its own preload configuration (for example for testing on-demand loading). In the same
         * time some test in that group may have its own preload, overriding others.

    Harness.configure({
        title           : 'Ext Scheduler Test Suite',
        preload         : [
            'http://cdn.sencha.io/ext-4.0.2a/resources/css/ext-all.css',
            'http://cdn.sencha.io/ext-4.0.2a/ext-all-debug.js',
            '../awesome-app-all-debug.js'
        ],
        ...
    })
    
    Harness.start(
        // regular file
        'data/crud.t.js',
        // a group with own "preload" config for its items
        {
            group       : 'On-demand loading',
            
            preload     : [
                'http://cdn.sencha.io/ext-4.0.2a/resources/css/ext-all.css',
                'http://cdn.sencha.io/ext-4.0.2a/ext-all-debug.js',
            ],
            items       : [
                'ondemand/sanity.t.js',
                'ondemand/special-test.t.js',
                // a test descriptor with its own "preload" config (have the most priority)
                {
                    url         : 'ondemand/4-0-6-compat.t.js',
                    preload     : [
                        'http://cdn.sencha.io/ext-4.0.6/resources/css/ext-all.css',
                        'http://cdn.sencha.io/ext-4.0.6/ext-all-debug.js',
                    ]
                },
                // sub-group
                {
                    group       : 'Sub-group',
                    items       : [
                        ...
                    ]
                }
            ]
        },
        ...
    )

         * Additionally, you can provide a test descriptor in the test file itself, adding it as the 1st or 2nd argument for `StartTest` call:  
         * 
    StartTest({
        autoCheckGlobals    : false,
        alsoPreload         : [ 'some_additional_preload.js' ]
    }, function (t) {
        ...
    }) 
         * 
         * Values from this object takes the highest priority and will override any other configuration.
         * 
         * @param {Array/Mixed} descriptor1 or an array of descriptors
         * @param {Mixed} descriptor2
         * @param {Mixed} descriptorN
         */
        start : function () {
            // a bit hackish - used by Selenium reporter..
            var me = Siesta.my.activeHarness = this
            
            this.mainPreset = new Siesta.Content.Preset({
                preload     : this.processPreloadArray(this.preload)
            })
            
            var descriptors = this.descriptors = Joose.A.map(Array.prototype.concat.apply([], arguments), function (desc, index) {
                return me.normalizeDescriptor(desc, me, index)
            })
            
            this.setup(function () {
                me.launch(descriptors)
            })
        },

        
        launch : function (descriptors, callback, errback) {
            var me                      = this
            
            //console.time('launch')
            //console.time('launch-till-preload')
            //console.time('launch-after-preload')
            
            this.needToStop             = false
            
            // no folders, only leafs
            var flattenDescriptors      = this.flattenDescriptors(descriptors)
            var testScriptsPreset       = new Siesta.Content.Preset()
            var presets                 = [ testScriptsPreset, this.mainPreset ]
            
            Joose.A.each(flattenDescriptors, function (desc) { 
                if (desc.preset != me.mainPreset) presets.push(desc.preset)
                
                testScriptsPreset.addResource(desc.url)
                
                me.deleteTestByURL(desc.url)
            })
            
            // cache either everything (this.cachePreload) or only the test files (to be able to show missing files / show content) 
            var contentManager  = new this.contentManagerClass({
                presets         : [ testScriptsPreset ].concat(this.cachePreload ? presets : [])
            })
            
            var options         = {
                increaseTimeout     : this.runCore == 'parallel' && flattenDescriptors.length > this.increaseTimeoutThreshold
            }
            
            //console.time('caching')
            
            me.onTestSuiteStart(descriptors)
            
            contentManager.cache(function () {
                
                //console.timeEnd('caching')
                
                Joose.A.each(flattenDescriptors, function (desc) { 
                    if (contentManager.hasContentOf(desc.url)) {
                        var testConfig  = desc.testConfig = Siesta.getConfigForTestScript(contentManager.getContentOf(desc.url))
                        
                        // if testConfig contains the "preload" or "alsoPreload" key - then we need to update the preset of the descriptor
                        if (testConfig && (testConfig.preload || testConfig.alsoPreload)) desc.preset = me.getDescriptorPreset(desc)
                    } else
                        // allow subclasses to define there own logic when found missing test file
                        me.markMissingFile(desc)
                        
                    me.normalizeScopeProvider(desc)
                })
                
                me.fireEvent('testsuitelaunch', descriptors, contentManager)
                
                me.runCoreGeneral(flattenDescriptors, contentManager, options, function () {
                    me.onTestSuiteEnd(descriptors, contentManager)
                    
                    callback && callback(descriptors)
                })
                
            }, function () {}, true)
        },
        
        
        markMissingFile : function (desc) {
            desc.isMissing = true
        },
        
        
        flattenDescriptors : function (descriptors, includeFolders) {
            var flatten     = []
            var me          = this
            
            Joose.A.each(descriptors, function (descriptor) {
                
                if (descriptor.group) {
                    
                    if (includeFolders) flatten.push(descriptor)
                    
                    flatten.push.apply(flatten, me.flattenDescriptors(descriptor.items, includeFolders))
                    
                } else
                    flatten.push(descriptor)
            })
            
            return flatten
        },
        

        getDescriptorConfig : function (descriptor, configName, doNotLookAtRoot) {
            var testConfig  = descriptor.testConfig
            
            if (testConfig && testConfig.hasOwnProperty(configName))    return testConfig[ configName ]
            if (descriptor.hasOwnProperty(configName))                  return descriptor[ configName ]
            
            var parent  = descriptor.parent
            
            if (parent) {
                if (parent == this)
                    if (doNotLookAtRoot) 
                        return undefined
                    else
                        return this[ configName ]
                
                return this.getDescriptorConfig(parent, configName, doNotLookAtRoot)
            }
            
            return undefined
        },
        
        
        getDescriptorPreset : function (desc) {
            var preload                 = this.getDescriptorConfig(desc, 'preload', true)
            var alsoPreload             = this.getDescriptorConfig(desc, 'alsoPreload', true)
            
            if (preload || alsoPreload)
                return new Siesta.Content.Preset({
                    preload     : this.processPreloadArray((preload || this.preload).concat(alsoPreload || []))
                })
                
            return this.mainPreset
        },
        
        
        normalizeScopeProvider : function (desc) {
            var scopeProvider = this.getDescriptorConfig(desc, 'scopeProvider')
            
            if (scopeProvider) {
                var match 
                
                if (match = /^=(.+)/.exec(scopeProvider))
                    scopeProvider = match[ 1 ]
                else 
                    scopeProvider = scopeProvider.replace(/^(Scope\.Provider\.)?/, 'Scope.Provider.')
            }
            
            desc.scopeProvider          = scopeProvider
            desc.scopeProviderConfig    = this.getDescriptorConfig(desc, 'scopeProviderConfig') 
        },
        
        
        normalizeDescriptor : function (desc, parent, index, level) {
            if (typeof desc == 'string') desc = { url : desc }
            
            level       = level || 0
            
            var me      = this
            
            desc.parent = parent
            
            // folder
            if (desc.group) {
                
                desc.id     = parent == this ? 'testFolder-' + level + '-' + index : parent.id + '/' + level + '-' + index
                desc.items  = Joose.A.map(desc.items || [], function (subDesc, index) {
                    return me.normalizeDescriptor(subDesc, desc, index, level + 1)
                })
                
            } else {
                // leaf case
                desc.id                     = desc.url
                desc.preset                 = this.getDescriptorPreset(desc)
                
                // the only thing left to normlize in the descriptor is now "scopeProvider"
                // we postpone this normalization to the moment after loading of the test files, 
                // since they can also contain "scopeProvider"-related configs
                // see "normalizeScopeProvider"
            }
            
            this.descriptorsById[ desc.id ] = desc
            
            return desc
        },
        
        
        runCoreGeneral : function (descriptors, contentManager, options, callback) {
            var runCoreMethod   = 'runCore' + Joose.S.uppercaseFirst(this.runCore)
            
            if (typeof this[ runCoreMethod ] != 'function') throw new Error("Invalid `runCore` specified: [" + this.runCore + "]")
            
            this[ runCoreMethod ](descriptors, contentManager, options, callback)
        },
        
        
        runCoreParallel : function (descriptors, contentManager, options, callback) {
            var me              = this
            var processedNum    = 0
            var count           = descriptors.length
            
            if (!count) callback()
            
            var exitLoop                = false
            var hasExited               = false
            var hasLaunchedAllThreads   = false
            
            var doProcessURL  = function (desc) {
                me.processURL(desc, desc.index, contentManager, options, function () {
                    processedNum++
                    
                    // set the internal closure `exitLoop` to stop launching new branches
                    // on the 1st encountering of `me.needToStop` flag
                    if (me.needToStop || exitLoop) {
                        exitLoop = true
                        
                        if (!hasExited) {
                            hasExited = true
                            callback()
                        }
                        
                        return
                    }
                    
                    if (processedNum == count) 
                        callback()
                    else
                        launchThread(descriptors)
                })
            }
            
            var launchThread  = function (descriptors) {
                var desc = descriptors.shift()
                
                if (!desc) return
                
                if (hasLaunchedAllThreads)
                    setTimeout(function () {
                        doProcessURL(desc)
                    }, me.pauseBetweenTests)
                else
                    doProcessURL(desc)
            }
            
            for (var i = 1; i <= this.maxThreads; i++) launchThread(descriptors)
            
            hasLaunchedAllThreads = true
        },
        
        
        runCoreSequential : function (descriptors, contentManager, options, callback) {
            if (descriptors.length && !this.needToStop) {
                var desc = descriptors.shift()
                
                var me = this
                
                this.processURL(desc, desc.index, contentManager, options, function () {

                    if (descriptors.length)
                        setTimeout(function () {
                            me.runCoreSequential(descriptors, contentManager, options, callback)
                        }, me.pauseBetweenTests)
                    else
                        callback()
                })
                
            } else
                callback()
        },
        
        
        getSeedingCode : function (desc) {
            return 'StartTest = startTest = function () { StartTest.args = arguments };' +
                      // for older IE - the try/catch should be from the same context as the exception
                      'StartTest.exceptionCatcher = function (func) { var ex; try { func() } catch (e) { ex = e; }; return ex; };' +
                      'StartTest.testErrorClass = Error;'
        },
        
        
        getScopeProviderConfigFor : function (desc) {
            var config          = Joose.O.copy(desc.scopeProviderConfig || {})
            
            config.seedingCode  = this.getSeedingCode()
            
            return config
        },
        
        
        keepTestResult : function (url) {
            // already keeping 
            if (this.lastResultsByURL[ url ]) {
                var indexOf     = -1
                
                Joose.A.each(this.lastResultsURLs, function (resultUrl, i) { 
                    if (resultUrl == url) { indexOf = i; return false }
                })
                
                this.lastResultsURLs.splice(indexOf, 1)
                this.lastResultsURLs.push(url)
                
                return
            }
            
            this.lastResultsURLs.push(url)
            this.lastResultsByURL[ url ] = true
            
            if (this.lastResultsURLs.length > this.keepNLastResults) this.releaseTestResult()
        },
        
        
        releaseTestResult : function () {
            if (this.lastResultsURLs.length <= this.keepNLastResults) return
            
            var url     = this.lastResultsURLs.shift()
            
            delete this.lastResultsByURL[ url ]
            
            var test    = this.getTestByURL(url)
            
            if (test && test.isFinished()) this.cleanupScopeForURL(url)
        },
        
        
        isKeepingResultForURL : function (url) {
            return this.lastResultsByURL[ url ]
        },
        
        
        setupScope : function (desc) {
            var url                 = desc.url
            var scopeProvideClass   = eval(desc.scopeProvider)
            
            this.cleanupScopeForURL(url)
            
            this.keepTestResult(url)
            
            return this.scopesByURL[ url ] = new scopeProvideClass(this.getScopeProviderConfigFor(desc))
        },
        
        
        cleanupScopeForURL : function (url) {
            var scopeProvider = this.scopesByURL[ url ]
            
            if (scopeProvider) {
                delete this.scopesByURL[ url ]
                
                scopeProvider.cleanup()
            }
        },


        // should prepare the "seedingScript" - include it to the `scopeProvider`
        prepareScopeSeeding : function (scopeProvider, desc, contentManager) {
            if (this.cachePreload && contentManager.hasContentOf(desc.url))
                scopeProvider.addPreload({
                    type        : 'js', 
                    content     : contentManager.getContentOf(desc.url)
                })
            else
                scopeProvider.seedingScript = this.resolveURL(desc.url, scopeProvider, desc)
        },

        
        // should normalize non-standard urls (like specifying Class.Name in preload)
        // such behavior is not documented and generally deprecated
        normalizeURL : function (url) {
            return url
        },
            
            
        resolveURL : function (url, scopeProvider, desc) {
            return url
        },
        
        
        processURL : function (desc, index, contentManager, urlOptions, callback) {
            var me      = this
            var url     = desc.url
            
            if (desc.isMissing) {
                callback()
                
                return
            }
            
            // a magical shared object, which will contains the `test` property with test instance, once the test will be created
            var testHolder      = {}
            // an array of errors occured during preload phase
            var preloadErrors   = []    
            
            var scopeProvider   = this.setupScope(desc)
            var transparentEx   = this.getDescriptorConfig(desc, 'transparentEx')
            
            var onErrorHandler  = function (msg, url, lineNumber) {
                var test = testHolder.test
                
                if (test && test.isStarted()) {
                    test.nbrExceptions++;
                    test.failWithException(msg + ' ' + url + ' ' + lineNumber)
                }
                else {
                    preloadErrors.push(msg + ' ' + url + ' ' + lineNumber)
                }
            }
            
            // trying to setup the `onerror` handler as early as possible - to detect each and every exception from the test
            if (!transparentEx) scopeProvider.addOnErrorHandler(onErrorHandler)
            
//            scopeProvider.addPreload({
//                type        : 'js', 
//                content     : 'console.time("scope-onload")'
//            })
            
            desc.preset.eachResource(function (resource) {
                
                if (me.cachePreload && contentManager.hasContentOf(resource))
                    scopeProvider.addPreload({
                        type        : (resource instanceof Siesta.Content.Resource.CSS) ? 'css' : 'js', 
                        content     : contentManager.getContentOf(resource)
                    })
                else {
                    var resourceDesc    = resource.asDescriptor()
                    
                    if (resourceDesc.url) resourceDesc.url = me.resolveURL(resourceDesc.url, scopeProvider, desc)
                    
                    scopeProvider.addPreload(resourceDesc)
                }
            })

            
            me.prepareScopeSeeding(scopeProvider, desc, contentManager)
            
            this.onBeforeScopePreload(scopeProvider, url)
            
            //console.timeEnd('launch-till-preload')
            
            //console.time('preload')
            
//            scopeProvider.addPreload({
//                type        : 'js', 
//                content     : 'console.timeEnd("scope-onload")'
//            })
            
            scopeProvider.setup(function () {
                me.onAfterScopePreload(scopeProvider, url)
                
                var startTestAnchor     = scopeProvider.scope.StartTest
                
                var args                = startTestAnchor && startTestAnchor.args
                
                // pick either 1st or 2nd argument depending which one is a function 
                var runFunc             = args && (typeof args[ 0 ] == 'function' ? args[ 0 ] : args[ 1 ])
                
                me.launchTest({
                    testHolder          : testHolder,
                    desc                : desc,
                    scopeProvider       : scopeProvider,
                    contentManager      : contentManager,
                    urlOptions          : urlOptions,
                    preloadErrors       : preloadErrors,
                    onErrorHandler      : onErrorHandler,
                    
                    startTestAnchor     : startTestAnchor,
                    
                    runFunc             : runFunc
                }, callback)
            });
        },
        
        
        launchTest : function (options, callback) {
            var scopeProvider   = options.scopeProvider
            var desc            = options.desc
//            desc, scopeProvider, contentManager, options, preloadErrors, onErrorHandler, callback
            
            //console.timeEnd('preload')
            //console.timeEnd('launch-after-preload')
            var me              = this
            var url             = desc.url
            var testClass       = me.getDescriptorConfig(desc, 'testClass')
        
            // after the scope setup, the `onerror` handler might be cleared - installing it again
            if (!this.getDescriptorConfig(desc, 'transparentEx')) scopeProvider.addOnErrorHandler(options.onErrorHandler)
            
            var testConfig      = me.getNewTestConfiguration(desc, scopeProvider, options.contentManager, options.urlOptions, options.runFunc, options.startTestAnchor)
            
            testConfig.callback = function () {
                if (!me.keepResults) {
                    if (!me.isKeepingResultForURL(url)) me.cleanupScopeForURL(url)
                }
        
                callback && callback()
            }
            
            var test            = options.testHolder.test = new testClass(testConfig)
            this.saveTestWithURL(url, test)
            
            scopeProvider.scope.setTimeout(function() {
                //console.timeEnd('launch')
                
                // start the test after slight delay - to run it already *after* onload (in browsers)
                test.start(options.preloadErrors[ 0 ])
            }, 10);
        },
        
        
        getNewTestConfiguration : function (desc, scopeProvider, contentManager, options, runFunc, startTestAnchor) {
            var scope           = scopeProvider.scope
            
            var config          = {
                url                 : desc.url,
            
                harness             : this,
                run                 : runFunc,
                
                startTestAnchor     : startTestAnchor,
                
                exceptionCatcher    : startTestAnchor.exceptionCatcher,
                testErrorClass      : startTestAnchor.testErrorClass,
            
                expectedGlobals     : this.cleanScopeGlobals.concat(this.getDescriptorConfig(desc, 'expectedGlobals')),
                autoCheckGlobals    : this.getDescriptorConfig(desc, 'autoCheckGlobals'),
                disableGlobalsCheck : this.disableGlobalsCheck,
            
                global              : scope,
                scopeProvider       : scopeProvider,
                
                contentManager      : contentManager,
                
                transparentEx       : this.getDescriptorConfig(desc, 'transparentEx'),
                needDone            : this.getDescriptorConfig(desc, 'needDone'),
                
                overrideSetTimeout      : this.getDescriptorConfig(desc, 'overrideSetTimeout'),
                originalSetTimeout      : scope.setTimeout,
                originalClearTimeout    : scope.clearTimeout,
                
                defaultTimeout          : this.getDescriptorConfig(desc, 'defaultTimeout') * (options.increaseTimeout ? 2 : 1),
                waitForTimeout          : this.getDescriptorConfig(desc, 'waitForTimeout') * (options.increaseTimeout ? 3 : 1),
                isReadyTimeout          : this.getDescriptorConfig(desc, 'isReadyTimeout')
            }
            
            // potentially not safe
            if (desc.testConfig) Joose.O.extend(config, desc.testConfig)
            
            return config
        },
        
        
        getScriptDescriptor : function (id) {
            return this.descriptorsById[ id ]
        },
        
        
        getTestByURL : function (url) {
            return this.testsByURL[ url ]
        },
        
        
        saveTestWithURL : function (url, test) {
            this.testsByURL[ url ] = test
        },
        
        
        deleteTestByURL : function (url) {
            delete this.testsByURL[ url ]
        },
        
        
        allPassed : function () {
            var allPassed       = true
            var me              = this
            
            Joose.A.each(this.flattenDescriptors(this.descriptors), function (descriptor) {
                // if at least one test is missing then something is wrong
                if (descriptor.isMissing) { allPassed = false; return false }
                
                var test    = me.getTestByURL(descriptor.url)
                
                // ignore missing tests (could be skipped by test filtering
                if (!test) return
                
                allPassed = allPassed && test.isPassed()
            })
            
            return allPassed
        },
        
        
        generateReport : function (options) {
            // a string? 
            if (Object(options) !== options) options = { format : options || 'JSON' }
            
            var methodName  = 'generate' + options.format + 'Report'
            
            if (!this[ methodName ]) throw "Can't generate report - missing the `" + methodName + "` method"
            
            return this[ methodName ](options)
        },
        
        
        typeOf : function (object) {
            return Object.prototype.toString.call(object).replace(/^\[object /, '').replace(/\]$/, '')
        }
    }
    // eof methods
})
//eof Siesta.Harness
;
/**
@class Siesta.Role.CanStyleOutput
@private

A role, providing output coloring functionality

*/
Role('Siesta.Role.CanStyleOutput', {
    
    has         : {
        /**
         * @cfg {Boolean} disableColoring When set to `true` will disable the colors in the console output in automation launchers / NodeJS launcher
         */
        disableColoring : false,
        
        style               : {
            is          : 'rwc',
            lazy        : 'this.buildStyle'
        },
        
        styles              : { 
            init    : {
                'bold'      : [1, 22],
                'italic'    : [3, 23],
                'underline' : [4, 24],
                
                'black '    : [30, 39],
                'yellow'    : [33, 39],
                'cyan'      : [36, 39],
                'white'     : [37, 39],
                'green'     : [32, 39],
                'red'       : [31, 39],
                'grey'      : [90, 39],
                'blue'      : [34, 39],
                'magenta'   : [35, 39],
                
                'bgblack '  : [40, 49],
                'bgyellow'  : [43, 49],
                'bgcyan'    : [46, 49],
                'bgwhite'   : [47, 49],
                'bggreen'   : [42, 49],
                'bgred'     : [41, 49],
                'bggrey'    : [100, 49],
                'bgblue'    : [44, 49],
                'bgmagenta' : [45, 49],
                
                'inverse'   : [7, 27]
            }
        }
    },
    
    
    methods : {
        
        buildStyle : function () {
            var me          = this
            var style       = {}
            
            Joose.O.each(this.styles, function (value, name) {
                
                style[ name ] = function (text) { return me.styled(text, name) }
            })
            
            return style
        },
        
        
        styled : function (text, style) {
            if (this.disableColoring) return text
            
            var styles = this.styles
            
            return '\033[' + styles[ style ][ 0 ] + 'm' + text + '\033[' + styles[ style ][ 1 ] + 'm'
        }
    }
})
;
// consuming harness need to use `sequential` run core

Role('Siesta.Role.ConsoleReporter', {
    
    requires    : [ 'log', 'exit', 'allPassed' ],
    
    
    does        : Siesta.Role.CanStyleOutput,
    
    has : {
        // special flag which will be used by automation launchers to prevent the summary message
        // after every page
        needSummaryMessage      : true
    },
    
    
    after : {
        
        markMissingFile : function (desc) {
            this.warn("Test file [" + desc.url + "] not found.")
        },
        
        
        onTestSuiteStart : function () {
        },
        
        
        onTestSuiteEnd : function () {
            if (this.needSummaryMessage) this.log(this.getSummaryMessage())
            
            this.exit(this.getExitCode())
        },
        
        
        onTestEnd : function (test) {
            this.log('[' + (test.isPassed() ? this.style().green('PASS') : this.style().red('FAIL')) + ']  ' + test.url) 
        },
        
        
        onTestFail : function (test, exception, stack) {
            var text = stack ? stack.join('\n') : exception + ''
                
            this.log(this.style().bold(this.style().red(text)))
        },
        
        
        onTestUpdate : function (test, result) {
            var text            = result + ''
            var needToShow      = this.verbosity > 0
            
            if ((result instanceof Siesta.Result.Assertion) || result.meta.name == 'Siesta.Result.Assertion') {
                if (result.isWaitFor && !result.completed) return;

                if (result.isTodo) {
                    text = this.styled(text, result.passed ? 'magenta' : 'yellow')
                    
                    if (result.passed) needToShow = true
                    
                } else {
                    text = this.styled(text, result.passed ? 'green' : 'red')
                    
                    if (!result.passed) needToShow = true
                }
            }
            
            if (result instanceof Siesta.Result.Diagnostic) {
                text = this.styled(text, 'bold')
                
                if (result.isWarning) {
                    this.warn(text)
                    return
                }
            }
            
            if (needToShow) this.log(text)
        }            
    },
    
    
    methods : {
        
        warn : function (text) {
            this.log(this.styled('[WARN] ', 'red') + text)
        },
        
        
        getSummaryMessage : function (allPassed) {
            allPassed = allPassed != null ? allPassed : this.allPassed()
            
            return allPassed ? this.style().bold(this.style().green('All tests passed')) : this.style().bold(this.style().red('There are failures'))
        },
        
        
        getExitCode : function () {
            return this.allPassed() ? 0 : 1
        }
    }
    
})


;
;
Class('Siesta.Content.Manager.NodeJS', {
    
    isa     : Siesta.Content.Manager,
    
    methods : {
        
        load : function (url, callback, errback) {
            
            try {
                var content = require('fs').readFileSync(url, 'utf8')
                
            } catch (e) {
                errback(e)
                
                return
            }
            
            callback(content)
        }
    }
})

;
/**
@class Siesta.Harness.NodeJS
@extends Siesta.Harness 

Class, representing the NodeJS harness. This class reports the output from all test files to console.

This file is a reference only however, for a getting start guide and manual, please refer to <a href="#!/guide/siesta_getting_started">Getting Started Guide</a>.

Synopsys
========

    var Harness,
        isNode        = typeof process != 'undefined' && process.pid
    
    if (isNode) {
        Harness = require('siesta');
    } else {
        Harness = Siesta.Harness.Browser;
    }
        
    
    Harness.configure({
        title     : 'Awesome Test Suite',
        
        transparentEx       : true,
        
        autoCheckGlobals    : true,
        expectedGlobals     : [
            'Ext',
            'Sch'
        ],
        
        preload : [
            "http://cdn.sencha.io/ext-4.0.2a/ext-all-debug.js",
            "../awesome-project-all.js",
            {
                text    : "console.log('preload completed')"
            }
        ]
    })
    
    
    Harness.start(
        // simple string - url relative to harness file
        'sanity.t.js',
        
        // test file descriptor with own configuration options
        {
            url     : 'basic.t.js',
            
            // replace `preload` option of harness
            preload : [
                "http://cdn.sencha.io/ext-4.0.6/ext-all-debug.js",
                "../awesome-project-all.js"
            ]
        },
        
        // groups ("folders") of test files (possibly with own options)
        {
            group       : 'Sanity',
            
            autoCheckGlobals    : false,
            
            items       : [
                'data/crud.t.js',
                ...
            ]
        },
        ...
    )

Running the test suite in NodeJS
================================

To run the suite in NodeJS, launch the harness javascript file:

    > node t/index.js


*/

Class('Siesta.Harness.NodeJS', {
    
    // static
    my : {
        isa         : Siesta.Harness,
        
        does        : Siesta.Role.ConsoleReporter,
        
        has : {
            contentManagerClass     : Siesta.Content.Manager.NodeJS,
            scopeProvider           : 'Scope.Provider.NodeJS',
            
            chdirToIndex            : true
        },
        
        
        before : {
            
            start : function () {
                this.runCore         = 'sequential'
                
                if (this.chdirToIndex) {
                    var indexFile = process.argv[1]
                    
                    var path = require('path')
                    
                    process.chdir(path.dirname(indexFile))
                }
            }
        },
        
        
        methods : {
            
            log     : console.log,
            exit    : process.exit,

            
            getScopeProviderConfigFor : function (desc) {
                var config = this.SUPER(desc)
                
                config.sourceURL    = desc.url
                
                return config
            },
            
            
            normalizeURL : function (url) {
                // ref to lib in current dist (no trailing `.js`) 
                if (!/\.js$/.test(url)) {
                    url = '../lib/' + url.replace(/\./g, '/') + '.js'
                }
                
                return url
            }
        }
        
    }
    //eof my
})
//eof Siesta.Harness.NodeJS


;
;
Class('Siesta', {
    /*PKGVERSION*/VERSION : '1.1.8',

    // "my" should been named "static"
    my : {
        
        has : {
            config          : null,
            activeHarness   : null
        },
        
        methods : {
        
            getConfigForTestScript : function (text) {
                try {
                    eval(text)
                    
                    return this.config
                } catch (e) {
                    return null
                }
            },
            
            
            StartTest : function (arg1, arg2) {
                if (typeof arg1 == 'object') 
                    this.config = arg1
                else if (typeof arg2 == 'object')
                    this.config = arg2
                else
                    this.config = null
            }
        }
    }
})

// fake StartTest function to extract test configs
if (typeof StartTest == 'undefined') StartTest = Siesta.StartTest;
module.exports   = Siesta.Harness.NodeJS;
