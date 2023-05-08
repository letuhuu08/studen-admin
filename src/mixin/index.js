import {
    textAuthor
} from "../constant/textAuthorView"


export const useAccountAuthorization = {
    name: 'useAccountAuthorization',
    data() {
        return {};
    },
    mounted() {},
    methods: {
        handleCheckActionAuthor(key) {
            const vm = this
            const listRoleUse = vm.$cookies.get('UserInfo', '').vaiTroSuDung.split(",")
            for (const item of listRoleUse) {
                if (key.includes(item)) return true
            }
            return false
        },
        handleCheckAuthor(keyAll, key) {
            console.log("key: ", keyAll, key)
            const vm = this
            let result = ""
            const listRoleUse = vm.$cookies.get('UserInfo', '')?.vaiTroSuDung.split(",")
            for (const item of listRoleUse) {
                if (keyAll.includes(item)) {
                    result = textAuthor.ALL
                    break
                }
                if (key.includes(item)) {
                    result = textAuthor.ALONE
                }

            }
            return result
        }
    },
}