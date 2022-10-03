package a203.findit.service;

import a203.findit.model.dto.req.User.PlayerInfoDTO;
import a203.findit.model.entity.Ranking;
import a203.findit.model.repository.RankingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RankingServiceImpl {
    final private RankingRepository rankingRepository;

    public void join(ArrayList<PlayerInfoDTO> playerInfoDTOS, String entercode){
        for(int i=0;i< playerInfoDTOS.size();i++){
            PlayerInfoDTO playerInfo = playerInfoDTOS.get(i);
            Ranking ranking = new Ranking();
            ranking.setGame_entercode(entercode);
            ranking.setPlayer_nickname(playerInfo.getNickname());
            ranking.setPlayer_rank(playerInfo.getRank());
            ranking.setPlayer_score(playerInfo.getScore());
            rankingRepository.save(ranking);
        }
    }
    public ArrayList<Ranking> show(String entercode){
        return (ArrayList<Ranking>) rankingRepository.findByEntercode(entercode);
    }
}
