import { View, TouchableOpacity, Text } from 'react-native';
import { GameController } from 'phosphor-react-native';

import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';

export interface DuoCardProps {
    id: string;
    hourEnd: string;
    hourStart: string;
    name: string;
    useVoidChannel: boolean;
    weekDays: string[];
    yearsPlaying: number;
}

interface Props {
    data: DuoCardProps;
    onConnect: () => void;
}


export function DuoCard({ data, onConnect }: Props) {

    return (
        <View style={styles.container}>
            <DuoInfo label='Nome' value={data.name} />
            <DuoInfo label='Tempo de jogo' value={`${data.yearsPlaying} ano(s)`} />
            <DuoInfo label='Disponibilidade' value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`} />
            <DuoInfo
              label='Chamada de áudio'
              value={data.useVoidChannel ? 'Sim' : 'Não'}
              colorValue={data.useVoidChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
            />

            <TouchableOpacity style={styles.button} onPress={onConnect}>
                <GameController color={THEME.COLORS.TEXT} size={20} />
                <Text style={styles.buttonTitle}>Conectar</Text>
            </TouchableOpacity>
        </View>
    );
}