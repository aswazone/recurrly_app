import {View, Text, Image} from 'react-native'
import React from 'react'
import {formatCurrency} from "@/lib/utils";
import clsx from "clsx";

const SubscriptionCard = ({ name, price, currency, icon, billing, color }: Subscription)  => {
    return (
        <View className={clsx('sub-card', 'bg-card')} style={color ? {backgroundColor: color} : undefined}>
            <View className={'sub-head'}>
                <View className={'sub-main'}>
                    <Image source={icon} className={'sub-icon'}/>
                    <View className={'sub-copy'}>
                        <Text className={'sub-title'} numberOfLines={1}>{name}</Text>
                    </View>
                </View>
                <View className={'sub-price-box'}>
                    <Text className={'sub-price'}>{formatCurrency(price, currency)}</Text>
                    <Text className={'sub-billing'}>{billing}</Text>
                </View>
            </View>
            <Text>SubscriptionCard</Text>
        </View>
    )
}
export default SubscriptionCard
